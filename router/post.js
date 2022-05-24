const express = require("express");
const { list, create, edit, listByUserId, del } = require("../controller/post");
const { auth } = require("../middleware");
const router = express.Router();

// get all post
router.get("/all", list);
// get post by user id
router.get("/user/:userId", listByUserId);
// create post
router.post("/", auth, create);
// edit post
router.put("/:postId", auth, edit);
// delete post
router.delete("/:postId", auth, del);

module.exports = router;
