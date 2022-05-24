const mongo = require("../db/index");
const healthService = require("../service/health");

module.exports.check = async (req, res) => {
  const check = await healthService.check(mongo);
  if (check) {
    res.status(200).json({ status: "OK" });
    return;
  }
  res.status(400).json({ status: "error" });
};
