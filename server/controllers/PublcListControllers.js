const List = require("../models/list");

const publicCollectionController = async (req, res, next) => {
  const publicList = await List.find({ shared: "public" });
  const publicCategories = [];

  publicList.forEach((obj) =>
    !publicCategories.includes(obj?.category)
      ? publicCategories.push(obj.category)
      : null
  );

  return res.status(200).json({
    success: true,
    msg: "Public Collections Fetched Successfully",
    categories: publicCategories,
  });
};

const publicListController = async (req, res, next) => {
  // const categoryQuery = req.query.collectionQuery;
  const categoryQuery = req.params.collectionName;
  const requestedList = await List.find({
    shared: "public",
    category: categoryQuery,
  });

  return res.status(200).json({
    success: true,
    msg: "Public Specific List Fetched Successfully",
    list: requestedList,
  });
};

module.exports = { publicCollectionController, publicListController };
