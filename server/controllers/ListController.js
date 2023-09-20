const jwt = require("jsonwebtoken");
const User = require("../models/user");
const List = require("../models/list");

exports.GetList = async (req, res, next) => {
  const { user_id } = req.body;
  // Check if user_id provided
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      const { collections: list } = user;
      return res
        .status(200)
        .json({ success: true, msg: "All list fetched", list });
    } else
      return res.status(400).json({ success: false, error: "No user Found" });
  } else
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
};

exports.AddList = async (req, res, next) => {
  const { user_id, name, link, description, category, shared } = req.body;
  // Check if user_id provided
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      // Check if category already present or New category is introduced
      if (!user.categories.includes(category)) {
        user.categories.push(category);
        await user.save();
      }
      // Add a new list
      const newList = await List.create({
        name,
        link,
        description,
        category,
        shared,
        user_id,
      });

      user.collections.push(newList._id);
      await user.save();
      // Fetch newly updated data
      const { collections: list } = await User.findOne({
        _id: user_id,
      }).populate("collections");
      return res.status(201).json({ msg: "List Added Successfully", list });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "User Id not provided" });
};

exports.RemoveList = async (req, res, next) => {
  const { user_id, link_id } = req.body;
  // Check if user_id provided
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      const link = await List.findOne({ _id: link_id });
      // Check if link list is valid
      if (link) {
        const deleted = await List.deleteOne({ _id: link_id });
        // Check if no error Occured and DeletedCount is 1
        if (deleted.acknowledged) {
          // if no list have that category then remove that category
          const listCategoryArray = await List.find({
            category: link.category,
            user_id,
          });
          if (listCategoryArray.length === 0) {
            await User.findByIdAndUpdate(user_id, {
              $pull: { categories: link.category },
            });
          }

          // Function to remove the deleted list from the user collections
          user.collections = user.collections.filter(({ _id }) => {
            return !_id.equals(link._id);
          });
          await user.save();

          // Fetch newly updated data
          const { collections: list } = await User.findOne({
            _id: user_id,
          }).populate("collections");

          return res.status(200).json({
            msg: "List Removed Successfully",
            list,
          });
        }
      } else
        return res.status(404).json({ success: false, error: "No List Found" });
    } else
      return res.status(404).json({ success: false, error: "No user Found" });
  } else
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
};

exports.UpdateList = async (req, res, next) => {
  const { user_id, updated_List } = req.body;
  // Check if user_id provided
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      const link = await List.findOne({ _id: updated_List._id });
      // Check if link list is valid
      if (link) {
        // Category Updation
        if (!user.categories.includes(updated_List.category)) {
          user.categories.push(updated_List.category);
          await user.save();
        }
        // Updation
        const update = await List.updateOne(
          { _id: link._id },
          { ...updated_List }
        );
        if (update.acknowledged) {
          // Fetch newly updated data
          const { collections: list } = await User.findOne({
            _id: user_id,
          }).populate("collections");

          return res.json({
            success: true,
            msg: "List Updated Successfully",
            list,
          });
        } else
          return res.status(400).json({
            success: false,
            error: "Error occured during updation",
          });
      } else
        return res.status(404).json({ success: false, error: "No List Found" });
    } else
      return res.status(404).json({ success: false, error: "No user Found" });
  } else
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
};

exports.GetCategoryList = async (req, res, next) => {
  const bearerToekn = req.headers.authorization;
  const token = bearerToekn?.split(" ")[1];
  const user_id = jwt.verify(token, process.env.TOKEN_SECRET)?.id;
  const queryCategory = req.query.category;
  // Check if user_id provided
  // res.json({ ok: "ok" });
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      // Check if category is valid
      if (user.categories.includes(queryCategory)) {
        // Fetch specific categories data list
        const list = await List.find({ user_id, category: queryCategory });

        return res.status(200).json({
          success: true,
          msg: `Category Fetched Successfully: ${queryCategory}`,
          list,
        });
      } else
        return res.status(404).json({
          success: false,
          error: "No such category exist",
        });
    } else
      return res.status(404).json({ success: false, error: "No user Found" });
  } else
    return res
      .status(400)
      .json({ success: false, error: "User Id not provided" });
};

exports.RemoveCollection = async (req, res, next) => {
  const { user_id, category } = req.body;
  // Check if user_id provided
  if (user_id) {
    const user = await User.findOne({ _id: user_id }).populate("collections");
    //  Check if user is valid
    if (user) {
      if (user.categories.includes(category)) {
        // Remove the Category from the User Categories
        await User.findByIdAndUpdate(user_id, {
          $pull: { categories: category },
        });

        // For Each Link delete from user collecions and delete from List Model
        const list = await List.find({ category });
        list.forEach(async (el) => {
          await List.findByIdAndDelete(el._id);

          // Function to remove the deleted list from the user collections
          user.collections = user.collections.filter(({ _id }) => {
            return !_id.equals(el._id);
          });
          await user.save();
        });

        // Fetch newly updated data
        const newUser = await User.findOne({
          _id: user_id,
        }).populate("collections");

        return res.status(200).json({
          msg: "List Removed Successfully",
          list: newUser.categories,
        });
      } else return res.status(400).json({ error: "Category Not Found" });
    } else return res.status(404).json({ error: "No user Found" });
  } else return res.status(400).json({ error: "User Id not provided" });
};
