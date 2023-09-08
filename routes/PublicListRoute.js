const express = require("express");
const { PublicListController } = require("../controllers/PublcListControllers");
const router = express.Router();

router.get("/list", PublicListController);

module.exports = router;
