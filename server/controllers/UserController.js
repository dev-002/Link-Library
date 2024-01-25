const User = require("../models/user");
const getuser = require("../utilities/getUser");

const getUsername = async (req, res, next) => {
  const data = res.locals.tokenData;
  if (data) {
    const user = await getuser(data._id);
    if (user) {
      return res.status(200).json({ success: true, username: user.username });
    }
  }
  return res.status(500).json({ error: "Something went wrong" });
};

const getUser = async (req, res, next) => {
  const data = req.locals.tokenData;
  try {
    if (data) {
      const user = await getuser(data._id);
      if (user)
        return res.status(200).json({
          username: user.username,
          email: user.email,
          collections: user.collections,
          liked: user.liked,
        });
    }
  } catch (error) {
    return res.status(500).json({ error: "Somehting went wrong" });
  }
};

const updateUser = async (req, res, next) => {
  const { updateUser } = req.body;
  const data = req.locals.tokenData;
  if (data) {
    const user = await getuser(data._id);
    if (user) {
      const updatedUser = await User.findByIdAndUpdate({ _id }, updatedUser);
      return res.status(200).json({ updateUser });
    }
  } else return res.status(500), json({ error: "Something went wrong" });
};

const getDashboard = async (req, res, next) => {
  const data = req.locals.tokenData;
  try {
    if (data) {
      const user = await getuser(data._id);
      if (user) {
        return res.status(200).json({
          tags: user.tags,
          links: user.collections,
          liked: user.liked,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ error: "Somehting went wrong" });
  }
};

const likeCollection = async (req, res, next) => {
  const collectionId = req.body.collectionId;
  const data = req.locals.tokenData;
  if (data) {
    const user = await getuser(data._id);
    user.liked.push(collectionId);
    await user.save();
    return res.status(200).json({});
  }
  return res.status(500).json({ error: "Something went wrong" });
};

module.exports = {
  getUsername,
  getUser,
  updateUser,
  getDashboard,
  likeCollection,
};
