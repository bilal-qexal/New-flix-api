const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").ContactForm;

router.post("/", controller.createContactForm);

module.exports = router;
