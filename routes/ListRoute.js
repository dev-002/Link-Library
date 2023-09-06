const express = require("express");
const {
  GetList,
  AddList,
  RemoveList,
  UpdateList,
} = require("../controllers/ListController");
const router = express.Router();

router.get("/", GetList);
router.post("/add", AddList);
router.post("/remove", RemoveList);
router.post("/update", UpdateList);

module.exports = router;
