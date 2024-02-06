const User = require("../models/user");

const getuser = async (_id) => {
  const user = await User.findOne({ _id })
    .populate("collections")
    .populate("liked")
    .populate({
      path: "collections",
      populate: { path: "link" },
      options: { strict: false },
    })
    .exec();
  return user;
};

module.exports = getuser;
