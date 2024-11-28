const iotService = require("../services/iotService");
const response = require("../utils/responseFormatter");
const MESSAGES = require("../utils/messages");
const topics = require("../config/topics");

const SUCCESS = MESSAGES.SUCCESS;
const ERROR = MESSAGES.ERRORS;

class IoTController {
  async publishValue(req, res) {
    try {
      const topic = topics.value;
      const { node_id, value_type, value } = req.body;
      const payload = { node_id, value_type, value };

      if (!topic || !node_id || !value_type || value === undefined) {
        return response.error(res, MESSAGES.VALIDATION.PUBLISH, 400);
      }

      await iotService.publish(topic, payload);

      return response.success(res, SUCCESS.PUBLISH_SUCCESS(topic));
    } catch (error) {
      let msg = error?.message.replace("Error: ", "");
      return response.error(res, msg);
    }
  }

  /**
   * Hàm xử lý chung để publish thông điệp
   */
  async publishCommand(req, res) {
    const topic = topics.client_to_server;
    const { command_id, command_name, value } = req.body;

    try {
      // Validate các trường chung
      if (!command_id || !command_name) {
        throw new Error(MESSAGES.VALIDATION.REQUIRED_FIELDS);
      }

      // Validate và xử lý từng loại lệnh cụ thể
      let payload = {};
      if (command_id == "CMD00020") {
        let type = req.body.type;
        let rule_id = req.body.rule_id;
        payload = await IoTController.buildControlRule(type, value);
        if (rule_id) {
          payload.rule_id = rule_id;
        }
      } else if (command_id == "CMD00030") {
        let type = req.body.type;
        let scenario_id = req.body.scenario_id;
        payload = await IoTController.buildScenario(type, value, command_name);
        if (scenario_id) {
          payload.scenario_id = scenario_id;
        }
      } else if (command_id == "CMD00010") {
        let device_type = req.body.device_type;
        let node_id = req.body.node_id;
        let value = req.body.value;
        payload = await IoTController.buildControlDevice(device_type, node_id, value);
      } else {
        throw new Error(MESSAGES.VALIDATION.INVALID_COMMAND_NAME);
      }

      // Bổ sung các trường chung
      payload = { command_id, command_name, ...payload };

      // Gửi lệnh qua MQTT
      const responseData = await iotService.publish(topic, payload);

      return response.success(
        res,
        MESSAGES.SUCCESS.PUBLISH_SUCCESS(topic),
        responseData
      );
    } catch (error) {
      const msg =
        error?.message?.replace("Error: ", "") ||
        MESSAGES.ERRORS.INTERNAL_SERVER_ERROR;
      return response.error(res, msg, 400);
    }
  }

  /**
   * Xử lý lệnh CONTROL_RULE
   */
  static async buildControlRule(type, value) {
    if (type === "ADD") {
      const {
        device_type_if,
        node_id_if,
        comparator_if,
        value_if,
        device_type,
        node_id,
        value: actionValue,
      } = value || {};

      if (
        !device_type_if ||
        !node_id_if ||
        !comparator_if ||
        !value_if ||
        actionValue === undefined ||
        !device_type ||
        !node_id
      ) {
        throw new Error(MESSAGES.VALIDATION.CONTROL_RULE);
      }

      let rule_id = await iotService.createRule(
        device_type_if,
        node_id_if,
        comparator_if,
        value_if,
        device_type,
        node_id,
        actionValue
      );

      return { type, rule_id, value };
    }

    if (type === "DELETE") {
      return { type, value: "" };
    }

    throw new Error(MESSAGES.VALIDATION.INVALID_TYPE);
  }

  /**
   * Xử lý lệnh SCENARIO
   */
  static async buildScenario(type, value, command_name) {
    let scenario_id = await iotService.createScenario(command_name, value);
    if (type === "ADD") {
      if (!Array.isArray(value) || value.length === 0) {
        throw new Error(MESSAGES.VALIDATION.SCENARIO);
      }
      return { type, scenario_id, value };
    }

    if (type === "RUN" || type === "DELETE") {
      return { type, scenario_id, value: "" };
    }

    throw new Error(MESSAGES.VALIDATION.INVALID_TYPE);
  }

  /**
   * Xử lý lệnh CONTROL_DEVICE
   */
  static async buildControlDevice(device_type, node_id, deviceValue) {
    if (!device_type || !node_id || deviceValue === undefined) {
      throw new Error(MESSAGES.VALIDATION.CONTROL_DEVICE);
    }

    return { device_type, node_id, value: deviceValue };
  }

  async getListDevice(req, res) {
    try {
      let data = await iotService.getListDevice(req);

      return response.success(res, SUCCESS.FETCH_SUCCESS, data);
    } catch (error) {
      let msg = error?.message.replace("Error: ", "");
      return response.error(res, msg);
    }
  }

  async getListRule(req, res) {
    try {
      let data = await iotService.getListRule(req);
      return response.success(res, SUCCESS.FETCH_SUCCESS, data);
    } catch (error) {
      let msg = error?.message.replace("Error: ", "");
      return response.error(res, msg);
    }
  }

  async getListScenario(req, res) {
    try {
      let data = await iotService.getListScenario(req);
      return response.success(res, SUCCESS.FETCH_SUCCESS, data);
    } catch (error) {
      let msg = error?.message.replace("Error: ", "");
      return response.error(res, msg);
    }
  }
}

module.exports = new IoTController();
