const express = require("express");
const { check } = require("express-validator");

const { list, register, login, info } = require("../controller/user");
const { vaildParams, auth } = require("../middleware/index");
const router = express.Router();

router.post(
  "/register",
  check("name", "Name is required").exists(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  vaildParams,
  register
);
router.post(
  "/login",
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").exists(),
  vaildParams,
  login
);
// dev
router.get("/all", list);
// get user by token
router.get("/", auth, info);

module.exports = router;
