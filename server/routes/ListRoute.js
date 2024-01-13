const express = require("express");
const {
  GetList,
  AddList,
  RemoveList,
  UpdateList,
  GetCategoryList,
  RemoveCollection,
} = require("../controllers/ListController");
const router = express.Router();

router.get("/", GetList);
router.post("/add", AddList);
router.delete("/remove", RemoveList);
router.put("/update", UpdateList);
router.delete("/collection/delete", RemoveCollection);

// get request for a particular Category List
router.post("/", GetCategoryList);

module.exports = router;
