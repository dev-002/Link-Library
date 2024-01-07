const express = require("express");
const { getUser, getDashboard } = require("../controllers/UserController");
const { VerifyRoute } = require("../utilities/verifyRoute");

const router = express.Router();

router.get("/", VerifyRoute, getUser);
router.get("/dashboard", VerifyRoute, getDashboard);

module.exports = router;
