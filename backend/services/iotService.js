const { mqtt, iot } = require("aws-iot-device-sdk-v2");
const fs = require("fs");
const config = require("../config/awsConfig");
const logger = require("../utils/logger");
const MESSAGES = require("../utils/messages");
const topics = require("../config/topics");
const mysql = require("mysql2/promise");
const dbConfig = require("../config/database");
const websocketService = require("./websocketService");

const SUCCESS = MESSAGES.SUCCESS;
const ERRORS = MESSAGES.ERRORS;

const db = mysql.createPool(dbConfig);

class IoTService {
  constructor() {
    this.connection = this.connect();
  }

  async connect() {
    try {
      if (this.connection) {
        logger.log(ERRORS.ALREADY_CONNECTED);
        return this.connection;
      }

      const clientCert = fs.readFileSync(config.certFilePath);
      const privateKey = fs.readFileSync(config.privateKeyFilePath);
      const rootCa = fs.readFileSync(config.caFilePath);

      const clientConfig =
        iot.AwsIotMqttConnectionConfigBuilder.new_mtls_builder(
          clientCert,
          privateKey
        )
          .with_certificate_authority(rootCa)
          .with_client_id(config.clientId)
          .with_clean_session(false)
          .with_endpoint(config.endpoint)
          .build();

      const mqttClient = new mqtt.MqttClient();
      const connection = mqttClient.new_connection(clientConfig);

      connection.on("connect", async () => {
        logger.log(SUCCESS.CONNECT_SUCCESS);
        let listSubscribed = [
          topics.value,
          topics.client_to_server,
          topics.server_to_client,
        ];

        listSubscribed.forEach((topic) => {
          try {
            connection.subscribe(topic, mqtt.QoS.AtLeastOnce);
            logger.log(SUCCESS.SUBSCRIBE_SUCCESS(topic));
          } catch (error) {
            logger.error(ERRORS.SUBSCRIBE_FAILED(error));
          }
        });
      });

      connection.on("message", (topic, payload) => {
        try {
          const buffer = Buffer.from(payload);
          const payloadString = buffer.toString("utf-8");
          const parsedPayload = JSON.parse(payloadString);
          logger.log(SUCCESS.RECEIVE_MESSAGE(topic) + payloadString);

          if ([topics.value, topics.server_to_client].includes(topic)) {
            websocketService.broadcastToFrontend({
              topic,
              data: parsedPayload,
            });

            if (topic == topics.server_to_client) {
              if (parsedPayload.command_id == "CMD00011") {
                this.processUpdateDevice(parsedPayload);
              }
            }

            if (topic == topics.value) {
              this.processUpdateDevice(parsedPayload);
            }
          }
        } catch (error) {
          logger.error(ERRORS.ERROR_PARSING_PAYLOAD(error));
        }
      });

      connection.on("error", (error) => {
        return new Error(error);
      });

      await connection.connect();

      return connection;
    } catch (error) {
      logger.error(ERRORS.CONNECT_FAILED(error));
      return null;
    }
  }

  async ensureConnected() {
    if (!this.connection) {
      await this.connect();
    }
    return this.connection;
  }

  async publish(topic, data) {
    try {
      const connection = await this.ensureConnected();

      const payload = JSON.stringify(data);
      await connection.publish(topic, payload, mqtt.QoS.AtLeastOnce);

      logger.log(SUCCESS.PUBLISH_SUCCESS(topic) + `: ${payload}`);

      return null;
    } catch (error) {
      logger.error(ERRORS.PUBLISH_FAILED(error));
      throw new Error(error);
    }
  }

  async processUpdateDevice(payload) {
    const connection = await db.getConnection();
    try {
      await connection.beginTransaction();
      let { device_type, node_id, value } = payload;
      let sql =
        "UPDATE devices SET value = ? WHERE node_id = ? AND device_type = ?";
      let params = [value, node_id, device_type];

      await db.query(sql, params);
      logger.log(SUCCESS.UPDATE_SUCCESS);

      await connection.commit();
    } catch (error) {
      await connection.rollback();
      logger.error(ERRORS.FETCH_FAILED(error));
      throw new Error(error);
    } finally {
      connection.release();
    }
  }

  async getListDevice(req) {
    try {
      let sql = "SELECT * FROM devices";
      let params = [];

      // if (req.node_id) {
      //   sql += " WHERE node_id = ?";
      //   params.push(req.node_id);
      // }

      const [rows] = await db.query(sql, params);

      return rows;
    } catch (error) {
      logger.error(ERRORS.FETCH_FAILED(error));
      throw new Error(error);
    }
  }

  async getListRule(req) {
    try {
      let sql = "SELECT * FROM rules";
      let params = [];
      let conditions = [];

      // if (req.body.node_id) {
      //   conditions.push("node_id_if = ?");
      //   params.push(req.body.node_id);
      // }

      // if (req.body.rule_id) {
      //   conditions.push("id = ?");
      //   params.push(req.body.rule_id);
      // }

      if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
      }

      const [rows] = await db.query(sql, params);

      return rows;
    } catch (error) {
      logger.error(ERRORS.FETCH_FAILED(error));
      throw new Error(error);
    }
  }

  async getListScenario(req) {
    try {
      let sql =
        "SELECT scenario_devices.*, scenarios.name as scenario_name " +
        "FROM scenario_devices JOIN scenarios ON scenarios.id = scenario_devices.scenario_id";
      let params = [];
      let conditions = [];

      // if (req.body.node_id) {
      //   conditions.push("scenario_devices.node_id = ?");
      //   params.push(req.body.node_id);
      // }

      // if (req.body.scenario_id) {
      //   conditions.push("scenarios.id = ?");
      //   params.push(req.body.scenario_id);
      // }

      if (conditions.length > 0) {
        sql += " WHERE " + conditions.join(" AND ");
      }

      const [rows] = await db.query(sql, params);

      return rows;
    } catch (error) {
      logger.error(ERRORS.FETCH_FAILED(error));
      throw new Error(error);
    }
  }

  async generateId(prefix, tableName) {
    try {
      const [[{ lastId }]] = await db.query(
        `SELECT MAX(id) AS lastId FROM ${tableName}`
      );

      if (!lastId) {
        if (prefix == "RULE") {
          return `${prefix}0001`;
        }

        return `${prefix}001`;
      }

      const lastNumber = parseInt(lastId.replace(prefix, ""), 10);
      const nextNumber = lastNumber + 1;
      const maxNum = prefix == "RULE" ? 4 : 3;

      return `${prefix}${String(nextNumber).padStart(maxNum, "0")}`;
    } catch (error) {
      logger.error(ERRORS.FETCH_FAILED(error));
      throw new Error(error);
    }
  }

  async createRule(
    device_type_if,
    node_id_if,
    comparator_if,
    value_if,
    device_type,
    node_id,
    actionValue
  ) {
    const connection = await db.getConnection();
    try {
      connection.beginTransaction();
      const ruleId = await this.generateId("RULE", "rules");
      const sql = `INSERT INTO rules (id, device_type_if, node_id_if, comparator_if, value_if, device_type, node_id, value) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      const params = [
        ruleId,
        device_type_if,
        node_id_if,
        comparator_if,
        value_if,
        device_type,
        node_id,
        actionValue,
      ];

      await db.query(sql, params);
      logger.log(SUCCESS.UPDATE_SUCCESS);

      await connection.commit();
      return ruleId;
    } catch (error) {
      await connection.rollback();
      logger.error(ERRORS.FETCH_FAILED(error));
      throw new Error(error);
    } finally {
      connection.release();
    }
  }

  async createScenario(command_name, value) {
    const connection = await db.getConnection();
    try {
      connection.beginTransaction();
      const scenarioId = await this.generateId("SCENE", "scenarios");
      const sql = `INSERT INTO scenarios (id, name) VALUES (?, ?)`;
      const params = [scenarioId, command_name];

      await db.query(sql, params);

      if (value.length > 0) {
        value.forEach(async (item) => {
          let sql = `INSERT INTO scenario_devices (scenario_id, device_type, node_id, value) VALUES (?, ?, ?, ?)`;
          let params = [
            scenarioId,
            item.device_type,
            item.node_id,
            item.value,
          ];

          await db.query(sql, params);
        });
      }
      logger.log(SUCCESS.UPDATE_SUCCESS);

      await connection.commit();
      return scenarioId;
    } catch (error) {
      await connection.rollback();
      logger.error(ERRORS.FETCH_FAILED(error));
      throw new Error(error);
    } finally {
      connection.release();
    }
  }
}

module.exports = new IoTService();
