const express = require("express");
const {
  // Collection
  getPrivateCollection,
  createPrivateCollection,
  deletePrivateCollection,
  updatePrivateCollection,
  // List
  getPrivateCollectionList,
  updatePrivateCollectionList,
  deletePrivateCollectionList,
  addPrivateCollectionList,
} = require("../controllers/PrivateController");
const router = express.Router();

router.get("/", getPrivateCollection);
router.post("/", createPrivateCollection);
router.put("/:collectionName", updatePrivateCollection);
router.delete("/:collectionName", deletePrivateCollection);

router.get("/:collectionName", getPrivateCollectionList);
router.post("/:collectionName", addPrivateCollectionList);
router.put("/:collectionName/update", updatePrivateCollectionList);
router.delete("/:collectionName/remove", deletePrivateCollectionList);

module.exports = router;
