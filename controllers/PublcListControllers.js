const List = require("../models/list");
const User = require("../models/user");

exports.PublicListController = async (req, res, next) => {
  const publicList = await List.find({ shared: true });
  const publicCategories = [];

  publicList.forEach((obj) =>
    !publicCategories.includes(obj.category)
      ? publicCategories.push(obj.category)
      : null
  );

  return res.json({
    success: true,
    msg: "Public List Fetched Successfully",
    publicCategories,
    publicList,
  });
};
