const express = require("express");
const {
  getUsername,
  getUser,
  updateUser,
  getDashboard,
  likeCollection,
} = require("../controllers/UserController");

const router = express.Router();

router.get("/username", getUsername);
router.get("/", getUser);
router.put("/", updateUser);
router.get("/dashboard", getDashboard);
router.post("/like", likeCollection);

module.exports = router;
