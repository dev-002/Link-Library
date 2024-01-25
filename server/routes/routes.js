const exporess = require("express");
const router = exporess.Router();

const ContactRoute = require("./ContactRoute");
const AuthRoute = require("./AuthRoute");
const UserRoute = require("./UserRoute");
const PublicRoute = require("./PublicRoute");
const PrivateRoute = require("./PrivateRoute");
const ReportRoute = require("./ReportRoute");
const AdminRoute = require("./AdminRoute");

// Utilities
const verifyRoute = require("../middlewares/verifyRoute");

router.use("/contact", ContactRoute);
router.use("/auth", AuthRoute);
router.use("/user", verifyRoute, UserRoute);
router.use("/public", PublicRoute);
router.use("/private", verifyRoute, PrivateRoute);
router.use("/report", ReportRoute);
router.use("/admin", verifyRoute, AdminRoute);

module.exports = router;
