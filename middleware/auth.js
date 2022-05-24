const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  const authorization = req.header("Authorization");

  if (!authorization) {
    return res
      .status(401)
      .json({ status: "error", msg: "No token, authorization denied" });
  }

  // Get token from authorization
  const token = authorization.split(" ")[1];

  if (token) {
    // Verify token
    try {
      jwt.verify(token, config.get("app.jwt.secret"), (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: "Token is not valid" });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } catch (err) {
      console.error("something wrong with auth middleware");
      return res.status(500).json({ msg: "Server Error" });
    }
  }
};
