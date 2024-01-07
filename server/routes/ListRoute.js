const express = require("express");
const {
  getList,
  addList,
  addCollection,
  removeList,
  updateList,
  getSpecificCollection,
  removeCollection,
} = require("../controllers/ListController");
const router = express.Router();

router.get("/", getList);
router.post("/add", addCollection);
router.post("/add/list", addList);
router.delete("/remove", removeList);
router.put("/update", updateList);

// request for a particular Category List
router.delete("/:collectionName", removeCollection);
router.get("/:collectionName", getSpecificCollection);

module.exports = router;
