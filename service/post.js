module.exports.getAll = async (db) => {
  return db.models.Post.find();
};
module.exports.getById = async (db, { _id }) => {
  return new Promise((resolve, reject) => {
    db.models.Post.findOne({ _id })
      .populate("User")
      .exec((err, post) => {
        if (err) {
          reject(err);
        }
        resolve(post);
      });
  });
};
module.exports.getByUserId = async (db, { userId }) => {
  return new Promise((resolve, reject) => {
    db.models.Post.find({ userId })
      .populate("User")
      .exec((err, post) => {
        if (err) {
          reject(err);
        }
        resolve(post);
      });
  });
};
module.exports.create = async (db, { title, content, userId }) => {
  const post = db.models.Post({ title, content, userId });
  return post.save();
};
module.exports.editById = async (db, { _id, title, content }) => {
  return new Promise((resolve, reject) => {
    db.models.Post.findByIdAndUpdate(
      _id,
      { title, content, updatedAt: Date.now() },
      (err, post) => {
        if (err) {
          reject(err);
        }
        resolve(post);
      }
    );
  });
};
module.exports.deleteById = async (db, { _id }) => {
  return new Promise((resolve, reject) => {
    db.models.Post.findByIdAndDelete(_id, (err, post) => {
      if (err) {
        reject(err);
      }
      resolve(post);
    });
  });
};
