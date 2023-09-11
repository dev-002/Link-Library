const express = require("express");
const {
  LoginController,
  RegisterController,
  LogoutController,
} = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", LoginController);
router.post("/register", RegisterController);
router.post("/logout", LogoutController);

module.exports = router;
