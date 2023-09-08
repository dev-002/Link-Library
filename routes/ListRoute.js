const express = require("express");
const {
  GetList,
  AddList,
  RemoveList,
  UpdateList,
  GetCategoryList,
} = require("../controllers/ListController");
const router = express.Router();

router.get("/", GetList);
router.post("/add", AddList);
router.post("/remove", RemoveList);
router.post("/update", UpdateList);

// get request for a particular Category List
router.get("/:category", GetCategoryList);

module.exports = router;
