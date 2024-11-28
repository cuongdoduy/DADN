const WebSocket = require("ws");
const MESSAGES = require("../utils/messages");
const logger = require("../utils/logger");

const SUCCESS = MESSAGES.SUCCESS;
const ERRORS = MESSAGES.ERRORS;

class WebSocketService {
  constructor() {
    this.clients = new Set();
    this.wss = null;
  }

  initWebSocket(port) {
    this.wss = new WebSocket.Server({ port });

    this.wss.on("connection", (ws) => {
      logger.log(SUCCESS.FRONTEND_CONNECTED);
      this.clients.add(ws);

      ws.on("close", () => {
        logger.log(SUCCESS.FRONTEND_DISCONNECTED);
        this.clients.delete(ws);
      });
    });
  }

  broadcastToFrontend(data) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
        logger.log(SUCCESS.SEND_SUCCESS(JSON.stringify(data)));
      }
    });
  }
}

module.exports = new WebSocketService();
