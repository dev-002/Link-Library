const User = require("../models/user");

const getUser = async (req, res, next) => {
  const data = req.locals.tokenData;
  try {
    if (data) {
      const user = await User.findOne({ _id: data.id });
      const returnData = {
        name: user.name,
        email: user.email,
      };

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res.status(200).json(returnData);
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid User or JWT expired" });
  }
};

const getDashboard = async (req, res, next) => {
  const data = req.locals.tokenData;
  try {
    if (data) {
      const user = await User.findOne({ _id: data.id }).populate("collections");
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      return res
        .status(200)
        .json({ categories: user.categories, links: user.collections });
    }
  } catch (error) {
    return res.status(400).json({ error: "Invalid User or JWT expired" });
  }
};

module.exports = { getDashboard, getUser };
