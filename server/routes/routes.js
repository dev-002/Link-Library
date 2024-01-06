const express = require("express");
const router = express.Router();

// Routes
const AuthRoute = require("./AuthRoute");
const ListRoute = require("./ListRoute");
const PublicListRoute = require("./PublicListRoute");
const UserRoute = require("./UserRoute");
const AdminRoute = require("./AdminRoute");
// Utilities
const { VerifyRoute } = require("../utilities/verifyRoute");

router.use("/auth", AuthRoute);
router.use("/private", VerifyRoute, ListRoute);
router.use("/public", PublicListRoute);
router.use("/user", UserRoute);
router.use("/admin", AdminRoute);

module.exports = router;
