const express = require("express");
const router = express.Router();

const {
  // user
  getUserDetail,
  getSpecificUserDetail,
  updateUserRole,
  banUser,
  // contact
  getContact,
  removeContact,
  // reports,
  getReport,
  deleteReportController,
} = require("../controllers/AdminController");

router.get("/user", getUserDetail);
router.get("/user/:userId", getSpecificUserDetail);
router.post("/userrole/:userId", updateUserRole);
router.delete("/banuser/:userId", banUser);

router.get("/contact", getContact);
router.delete("/contact/:contactId", removeContact);

router.get("/report", getReport);
router.post("/report/:reportId", deleteReportController);

module.exports = router;
