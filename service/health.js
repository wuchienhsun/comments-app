module.exports.check = async (db) => {
  if (db.readyState === 1) {
    return true;
  }
  console.log("mongo connection error state", db.readyState);
  return false;
};
