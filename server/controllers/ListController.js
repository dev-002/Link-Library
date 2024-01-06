const jwt = require("jsonwebtoken");
const User = require("../models/user");
const List = require("../models/list");

const getList = async (req, res, next) => {
  const user_id = res.locals.tokenData.id;
  // Check if user_id not provided
  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
  }
  const user = await User.findOne({ _id: user_id }).populate("collections");
  //  Check if user is invalid
  if (!user) {
    return res.status(404).json({ success: false, error: "No user Found" });
  }

  return res.status(200).json({
    success: true,
    msg: "All list fetched",
    collections: user.categories,
  });
};

const addCollection = async (req, res, next) => {
  const { name, shared, category } = req.body;
  if (!(name && shared && category)) {
    return res.status(400).json({ error: "Values not provided" });
  }
  const user_id = req.locals.tokenData.id;
  const user = await User.findOne({ _id: user_id });
  if (!user) {
    return res.status(404).json({ error: "No user Found" });
  }

  user.categories.push(category);
  user.save();
  const collection = await List.create({
    name,
    shared,
    category,
    owner: user_id,
  });
  return res
    .status(201)
    .json({ msg: "Collection Added Successfully", collection });
};

const addList = async (req, res, next) => {
  const { name, link, description, category, shared } = req.body;
  const user_id = req.locals.tokenData.id;
  // Check if user_id not provided
  if (!user_id) {
    return res.status(404).json({ error: "User Id not provided" });
  }

  const user = await User.findOne({ _id: user_id }).populate("collections");
  //  Check if user is invalid
  if (!user) {
    return res.status(404).json({ error: "No user Found" });
  }

  // Check if category is present in categories
  if (!user.categories.includes(category)) {
    return res.status(400).json({
      error: "Category Does not exist",
    });
  }

  // Add a new list
  const collection = await List.findOne({
    category,
    owner: user_id,
  });

  if (!list) {
    return res.status(404).json({ error: "No Collection Found" });
  }

  collection.list.push({
    name,
    link,
    description,
  });
  collection.save();

  // Fetch newly updated data
  const { collections: list } = await User.findOne({
    _id: user_id,
  }).populate("collections");
  return res.status(201).json({ msg: "List Added Successfully", list });
};

const removeList = async (req, res, next) => {
  const { collection_id, link_id } = req.body;
  const user_id = req.locals.tokenData.id;
  // Check if user_id not provided
  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
  }

  const user = await User.findOne({ _id: user_id }).populate("collections");
  //  Check if user is invalid
  if (!user) {
    return res.status(404).json({ success: false, error: "No user Found" });
  }

  const collection = await List.findOne({ _id: collection_id });
  // Check if link list is invalid
  if (!collection) {
    return res.status(404).json({ success: false, error: "No List Found" });
  }

  collection.list.filter((link) => {
    return link._id !== link_id;
  });
  collection.save();

  // const deleted = await List.deleteOne({ _id: collection_id });
  // Check if no error Occured and DeletedCount is 1
  // if (deleted.acknowledged) {
  // if no list have that category then remove that category
  // const listCategoryArray = await List.find({
  //   category: link.category,
  //   user_id,
  // });
  // if (listCategoryArray.length === 0) {
  //   await User.findByIdAndUpdate(user_id, {
  //     $pull: { categories: link.category },
  //   });
  // }

  // Function to remove the deleted list from the user collections
  // user.collections = user.collections.filter(({ _id }) => {
  //   return !_id.equals(link._id);
  // });
  // await user.save();

  // Fetch newly updated data
  const { collections: list } = await User.findOne({
    _id: user_id,
  }).populate("collections");

  return res.status(200).json({
    msg: "List Removed Successfully",
    list,
  });
  // }
};

const updateList = async (req, res, next) => {
  const { updated_List } = req.body;
  const user_id = req.locals.tokenData.id;
  // Check if user_id not provided
  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
  }

  const user = await User.findOne({ _id: user_id }).populate("collections");
  //  Check if user is invalid
  if (!user) {
    return res.status(404).json({ success: false, error: "No user Found" });
  }

  const list = await List.findOne({
    owner: user_id,
    category: updated_List.category,
  });
  // Check if link list is invalid
  if (!list) {
    return res.status(404).json({ success: false, error: "No List Found" });
  }

  // // Category Updation
  // if (!user.categories.includes(updated_List.category)) {
  //   user.categories.push(updated_List.category);
  //   await user.save();
  // }
  // Updation
  const linkFound = list.list.find((link) => {
    return link._id == updated_List._id;
  });

  linkFound = { ...linkFound, ...updated_List };
  list.save();
  // const update = await List.updateOne({ _id: list._id }, { ...updated_List });
  // if (update.acknowledged) {
  // Fetch newly updated data
  const { collections } = await User.findOne({
    _id: user_id,
  }).populate("collections");

  return res.json({
    success: true,
    msg: "List Updated Successfully",
    list: collections,
  });
};

const getSpecificCollection = async (req, res, next) => {
  const user_id = res.locals.tokenData.id;
  // const queryCategory = req.query.collectionQuery;
  const queryCategory = req.params.collectionName;
  // Check if user_id not provided
  if (!user_id) {
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
  }
  const user = await User.findOne({ _id: user_id }).populate("collections");
  //  Check if user is invalid
  if (user) {
    return res.status(404).json({ success: false, error: "No user Found" });
  }
  // Check if category is invalid
  if (!user.categories.includes(queryCategory)) {
    return res.status(404).json({
      success: false,
      error: "No such category exist",
    });
  }
  // Fetch specific categories data list
  const collection = await List.find({
    owner: user_id,
    category: queryCategory,
  });

  return res.status(200).json({
    success: true,
    msg: `Category Fetched Successfully: ${queryCategory}`,
    list: collection.list,
  });
};

const removeCollection = async (req, res, next) => {
  const queryCategory = req.params.categoryName;
  const user_id = req.locals.tokenData.id;
  // Check if user_id not provided
  if (!user_id) {
    return res.status(400).json({ error: "User Id not provided" });
  }
  const user = await User.findOne({ _id: user_id }).populate("collections");
  //  Check if user is invalid
  if (!user) {
    return res.status(404).json({ error: "No user Found" });
  }

  // Check if user have that category
  if (!user.categories.includes(category)) {
    return res.status(400).json({ error: "Category Not Found" });
  }

  // Remove the Category from the User Categories
  await User.findByIdAndUpdate(user_id, {
    $pull: { categories: queryCategory },
  });

  // For Each Link delete from user collecions and delete from List Model
  const list = await List.findOneAndDelete({
    category: queryCategory,
    owner: user_id,
  });
  // list.forEach(async (el) => {
  //   await List.findByIdAndDelete(el._id);

  // Function to remove the deleted list from the user collections
  //   user.collections = user.collections.filter(({ _id }) => {
  //     return !_id.equals(el._id);
  //   });
  //   await user.save();
  // });

  // Fetch newly updated data
  const newUser = await User.findOne({
    _id: user_id,
  }).populate("collections");

  return res.status(200).json({
    msg: "List Removed Successfully",
    list: newUser.categories,
  });
};

module.exports = {
  getList,
  addList,
  addCollection,
  removeList,
  updateList,
  getSpecificCollection,
  removeCollection,
};
