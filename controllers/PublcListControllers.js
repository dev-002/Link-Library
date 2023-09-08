const List = require("../models/list");
const User = require("../models/user");

exports.PublicListController = async (req, res, next) => {
  const publicList = await List.find({ shared: true });
  const publicCategories = [];

  const Users = await User.find();
  for (const user of Users)
    for (const category of user.categories)
      if (!publicCategories.includes(category)) publicCategories.push(category);

  return res.json({
    success: true,
    msg: "Public List Fetched Successfully",
    publicCategories,
    publicList,
  });
};
