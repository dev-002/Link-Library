const express = require("express");
const router = express.Router();

const { adminLogin, adminUserList } = require("../controllers/AdminController");
const { VerifyRoute } = require("../utilities/verifyRoute");

router.post("/login", adminLogin);
router.get("/user", VerifyRoute, adminUserList);

module.exports = router;
