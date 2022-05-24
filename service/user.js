const jwt = require("jsonwebtoken");
const config = require("config");

module.exports.create = async (db, { name, password, email }) => {
  try {
    const user = db.models.User({ name, password, email });
    return user.save();
  } catch (err) {
    console.log("user service create err", err);
    return err;
  }
};

module.exports.getByEmail = async (db, { email }) => {
  try {
    return db.models.User.findOne({ email });
  } catch (err) {
    console.log("user service create err", err);
  }
};

module.exports.getById = async (db, { _id }) => {
  try {
    return db.models.User.findOne({ _id });
  } catch (err) {
    console.log("user service getById err", err);
  }
};

module.exports.createJwtTokenByPayload = async (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      config.get("app.jwt.secret"),
      { expiresIn: config.get("app.jwt.expire") },
      (err, token) => {
        if (err) throw reject(err);
        resolve(token);
      }
    );
  });
};
