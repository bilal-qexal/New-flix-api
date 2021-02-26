const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").About;

router.get("/", controller.getAbout);

module.exports = router;
