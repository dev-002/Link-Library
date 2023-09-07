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
      return res.json({ success: true, msg: "All list fetched", list });
    } else return res.json({ success: false, error: "No user Found" });
  } else return res.json({ success: false, error: "User Id not provided" });
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
      return res.json({ success: true, msg: "List Added Successfully", list });
    } else return res.json({ success: false, error: "No user Found" });
  } else return res.json({ success: false, error: "User Id not provided" });
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
          // Function to check if only 1 list had category or more
          // if only 1 had that category then remove that category
          /* const categoryCournt = user.categories.reduce((acc,)=>{}, 0);
          if (categoryCount === 1) {
            user.categories.filter((category) => category !== link.category);
            await user.save();
          }
          */

          // Function to remove the deleted list from the user collections
          user.collections = user.collections.filter(({ _id }) => {
            return !_id.equals(link._id);
          });
          await user.save();

          // Fetch newly updated data
          const { collections: list } = await User.findOne({
            _id: user_id,
          }).populate("collections");

          return res.json({
            success: true,
            msg: "List Removed Successfully",
            list,
          });
        }
      } else return res.json({ success: false, error: "No List Found" });
    } else return res.json({ success: false, error: "No user Found" });
  } else return res.json({ success: false, error: "User Id not provided" });
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
          return res.json({
            success: false,
            error: "Error occured during updation",
          });
      } else return res.json({ success: false, error: "No List Found" });
    } else return res.json({ success: false, error: "No user Found" });
  } else return res.json({ success: false, error: "User Id not provided" });
};
