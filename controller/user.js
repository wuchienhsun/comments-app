const mongo = require("../db/index");
const userService = require("../service/user");

module.exports.register = async (req, res) => {
  try {
    const { name, password, email } = req.body;
    // find and check email if exist
    const exist = await userService.getByEmail(mongo, { email });

    if (exist) {
      res.status(400).json({ msg: "email duplicate", status: "error" });
      return;
    }

    const user = await userService.create(mongo, { name, password, email });
    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = await userService.createJwtTokenByPayload(payload);

    res.status(200).json({ token, status: "OK" });
  } catch (err) {
    console.log("err", err);
    res.status(400).json({ status: "error", msg: "register error" });
  }
};

module.exports.login = async (req, res) => {
  const { password, email } = req.body;
  const user = await userService.getByEmail(mongo, { email });
  if (user) {
    // check password if equal
    if (password === user.password) {
      // return jwt token
      const payload = {
        user: {
          id: user.id,
        },
      };

      const token = await userService.createJwtTokenByPayload(payload);

      res.status(200).json({ token, status: "OK" });
      return;
    }
  }
  res.status(400).json({ status: "error", msg: "login error" });
};

// dev
module.exports.list = async (req, res) => {
  const users = await userService.list(mongo);
  res.json({ data: users, status: "OK" });
};

module.exports.info = async (req, res) => {
  const { id } = req.user;
  const user = await userService.getById(mongo, { _id: id });
  const data = {
    id: user._id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };

  res.json({ data, status: "OK" });
};
