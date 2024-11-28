const websocketService = require("../services/websocketService");
const MESSAGES = require("../utils/messages");
const logger = require("../utils/logger");

const SUCCESS = MESSAGES.SUCCESS;
const ERRORS = MESSAGES.ERRORS;

module.exports = {
  initWebSocketServer: () => {
    const port = process.env.WEBSOCKET_PORT || 8080;
    websocketService.initWebSocket(port);
    logger.log(SUCCESS.WEBSOCKET_SERVER_RUNNING(port));
  },
};
