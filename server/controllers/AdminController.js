const Collection = require("../models/collection");
const Contact = require("../models/contact");
const Report = require("../models/report");
const User = require("../models/user");

const getUserDetail = async (req, res, next) => {
  let users = await User.find().populate("collections").populate("link");

  users = users.map((user) => {
    return {
      username: user.username,
      email: user.email,
      collections: user.collections.length,
      liked: user.liked.length,
    };
  });

  return res.status(200).json({
    msg: "User Details Fetched Successfully",
    users,
  });
};
const getSpecificUserDetail = async (req, res, next) => {
  const userId = req.params.userId;
  const user = await User.findById(userId)
    .populate("collections")
    .populate("link")
    .populate("liked");

  return res.status(200).json({
    msg: "User fetched Successfully",
    user,
  });
};
const updateUserRole = async (req, res, next) => {
  const userId = req.params.userId;
  const userRole = req.body.role;

  const acknowledge = await User.findByIdAndUpdate(userId, {
    $set: { role: userRole },
  })
    .populate("collections")
    .populate();
  if (acknowledge) {
    return res.status(200).json({ msg: "User role updated", acknowledge });
  } else
    return res.status(500).json({ error: "Error while updating user role" });
};
const banUser = async (req, res, next) => {
  const userId = req.params.userId;

  const user_acknowledge = await User.deleteOne({ _id: userId });
  const collection_acknowledge = await Collection.deleteMany({ owner: userId });

  if (user_acknowledge.acknowledged && collection_acknowledge.acknowledged) {
    return res.status(200).json({ msg: "User deleted successfully" });
  } else return res.status(500).json({ error: "Error while deleting user" });
};

const getContact = async (req, res, next) => {
  const contacts = await Contact.find();
  return res.status(200).json({
    msg: "Contact forms fetched Successfully",
    contacts,
  });
};
const removeContact = async (req, res, next) => {
  const contact_id = req.params.contactId;

  const acknowledge = await Contact.deleteOne({ _id: contact_id });
  if (acknowledge.acknowledged) {
    return res.status(200).json({ msg: "Contact form deleted Successfully" });
  }
  return res.status(500).json({ error: "Contact form deletion falied" });
};

const getReport = async (req, res, next) => {
  const reports = await Report.find();
  return res.status(200).json({
    msg: "Report fetched Successfully",
    reports,
  });
};
const deleteReportController = async (req, res, next) => {
  const report_id = req.params.reportId;

  const acknowledge = await Report.deleteOne({ _id: report_id });
  if (acknowledge.acknowledged) {
    return res.status(200).json({ msg: "Report deleted Successfully" });
  }
  return res.status(500).json({ error: "Report deletion falied" });
};

module.exports = {
  // user
  getUserDetail,
  getSpecificUserDetail,
  updateUserRole,
  banUser,
  // contact
  getContact,
  removeContact,
  // report
  getReport,
  deleteReportController,
};
