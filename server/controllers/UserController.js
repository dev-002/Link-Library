const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.getUser = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const data = jwt.verify(bearerToken?.split(" ")[1], process.env.TOKEN_SECRET);
  try {
    if (data) {
      const user = await User.findOne({ _id: data.id });
      if (user) return res.status(200).json({ user });
      else return res.status(500).json({ error: "Somehting went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid User or JWT expired" });
  }
};

module.exports.getDashboard = async (req, res, next) => {
  const bearerToken = req.headers.authorization;
  const data = jwt.verify(bearerToken?.split(" ")[1], process.env.TOKEN_SECRET);
  try {
    if (data) {
      const user = await User.findOne({ _id: data.id }).populate("collections");
      if (user) {
        return res
          .status(200)
          .json({ categories: user.categories, links: user.collections });
      } else return res.status(500).json({ error: "Somehting went wrong" });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid User or JWT expired" });
  }
};
