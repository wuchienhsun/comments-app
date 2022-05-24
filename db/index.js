const mongoose = require("mongoose");
const config = require("config");
const dbURL = config.get("app.db.url");

class Mongo {
  instance;
  constructor() {
    this.init();
  }
  init() {
    try {
      if (this.instance) return this.instance;
      const conn = mongoose.createConnection(dbURL);

      conn.model("User", require("../model/user"));
      conn.model("Post", require("../model/post"));
      this.instance = conn;

      // conn.models.User.findByIdAndDelete

      return conn;
    } catch (err) {
      console.error("mongo err", err.message);
      // Exit process with failure
      process.exit(1);
    }
  }
}

module.exports = new Mongo().instance;
