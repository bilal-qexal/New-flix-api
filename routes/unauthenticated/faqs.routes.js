const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").FAQs;

router.get("/", controller.getAll);

module.exports = router;
