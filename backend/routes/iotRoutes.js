const express = require("express");
const router = express.Router();
const iotController = require("../controllers/iotController");

// Route để publish một thông điệp đến một topic value
router.post("/value", iotController.publishValue);

// Route để publish một thông điệp đến một topic clienttoserver
router.post("/client_to_server", iotController.publishCommand);

// Route để lấy thông tin từ database
router.get("/devices", iotController.getListDevice);

router.get("/rules", iotController.getListRule);

router.get("/scenarios", iotController.getListScenario);

module.exports = router;
