const express = require("express");
const { createPin, getPins } = require("../controllers/pinsController");

const router = express.Router();

router.route("/").post(createPin);
router.route("/").get(getPins);

module.exports = router;
