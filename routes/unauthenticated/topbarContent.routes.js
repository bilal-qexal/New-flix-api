const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").TopbarContent;

router.get("/", controller.getTopbarContent);

module.exports = router;
