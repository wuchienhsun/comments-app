const mongo = require("../db/index");
const postService = require("../service/post");

module.exports.list = async (req, res) => {
  const posts = await postService.getAll(mongo);

  return res.status(200).json({ data: posts, status: "OK" });
};

module.exports.listByUserId = async (req, res) => {
  const posts = await postService.getByUserId(mongo, {
    userId: req.params.userId,
  });

  return res.status(200).json({ data: posts, status: "OK" });
};

module.exports.create = async (req, res) => {
  try {
    const { title, content } = req.body;
    await postService.create(mongo, { title, content, userId: req.user.id });

    return res.status(200).json({ status: "OK" });
  } catch (err) {
    console.log("post create err", err);
    res.status(400).json({ status: "error", msg: "post create error" });
  }
};

module.exports.edit = async (
  { body: { title, content }, params: { postId } },
  res
) => {
  try {
    await postService.editById(mongo, { _id: postId, title, content });

    return res.status(200).json({ status: "OK" });
  } catch (err) {
    console.log("post edit err", err);
    res.status(400).json({ status: "error", msg: "post edit error" });
  }
};

module.exports.del = async ({ params: { postId } }, res) => {
  try {
    await postService.deleteById(mongo, { _id: postId });

    return res.status(200).json({ status: "OK" });
  } catch (err) {
    console.log("post delete err", err);
    res.status(400).json({ status: "error", msg: "post delete error" });
  }
};
