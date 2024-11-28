const express = require("express");
const app = express();
const iotRoutes = require("./routes/iotRoutes");
const { initWebSocketServer } = require("./controllers/websocketController");

app.use(express.json());

// Thiết lập API route
app.use("/api", iotRoutes);

(async () => {
  try {
    // Initialize WebSocket server
    initWebSocketServer();

    console.log("Application is running!");
  } catch (error) {
    console.error("Failed to start the application:", error);
  }
})();

// Khởi chạy server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
