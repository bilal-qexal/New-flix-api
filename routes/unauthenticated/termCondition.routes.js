const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").TermCondition;

router.get("/", controller.getTermsAndCondition);

module.exports = router;
