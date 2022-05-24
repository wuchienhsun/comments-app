const express = require("express");
const { check } = require("../controller/health");
const router = express.Router();

router.get("/check", check);

module.exports = router;
