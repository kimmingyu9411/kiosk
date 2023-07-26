const express = require("express");
const cookieParser = require("cookie-parser");
const connector = require("./db/db.js");
const config = require("./config.js");
const router = require("./routes/index.js");

class App {
  constructor() {
    this.app = express();
    this.connector = connector;
  }
  setup() {
    this.app.use(express.json());
    this.app.use(cookieParser());
    this.app.use("/", router);
  }
  runServer() {
    this.app.listen(config.server.port, () => {
      console.log("🔥".repeat(40));
      console.log(
        `Server is running on http://localhost:${config.server.port}`
      );
    });
  }
}

module.exports = App;
