const exporess = require("express");
const router = exporess.Router();

const { contactController } = require("../controllers/ContactController");

router.post("/", contactController);

module.exports = router;
