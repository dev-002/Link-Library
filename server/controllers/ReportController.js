const Report = require("../models/report");

const reportController = async (req, res, next) => {
  const reportCollection = req.params.collectionName;
  let { collection_id, user_id } = req.body;
  if (!user_id) user_id = "Guest";

  const findReport = await Report.findOne({ collection: collection_id });
  if (findReport) {
    findReport.count++;
    findReport.by.push(user_id);
    await findReport.save();
  } else {
    await Report.create({
      collection: collection_id,
      by: user_id,
    });
  }

  return res.status(200).json({ msg: "Reported Successfully" });
};

module.exports = { reportController };
