const express = require("express");
const {
  PublicCollection,
  PublicCollectionList,
} = require("../controllers/PublcControllers");
const router = express.Router();

router.get("/", PublicCollection);
router.get("/:collectionName", PublicCollectionList);

module.exports = router;
