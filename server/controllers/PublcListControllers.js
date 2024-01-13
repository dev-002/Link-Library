const List = require("../models/list");

exports.PublicListController = async (req, res, next) => {
  const publicList = await List.find({ shared: true });
  const publicCategories = [];

  publicList.forEach((obj) =>
    !publicCategories.includes(obj.category)
      ? publicCategories.push(obj.category)
      : null
  );

  return res.status(200).json({
    success: true,
    msg: "Public List Fetched Successfully",
    categories: publicCategories,
  });
};

exports.PublicCategoryController = async (req, res, next) => {
  const categoryQuery = req.query.collectionQuery;
  const publicList = await List.find({ shared: true, category: categoryQuery });

  return res.status(200).json({
    success: true,
    msg: "Public List Fetched Successfully",
    list: publicList,
  });
};
