const express = require("express");
const router = express.Router();
const {
  publicListController,
  publicCollectionController,
} = require("../controllers/PublcListControllers");

router.get("/list", publicCollectionController);
router.get("/list/:collectionName", publicListController);

module.exports = router;
