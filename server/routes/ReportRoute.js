const express = require("express");
const router = express.Router();

const {
  reportController,
  deleteReportController,
} = require("../controllers/ReportController");

router.post("/:collectionName", reportController);

module.exports = router;
