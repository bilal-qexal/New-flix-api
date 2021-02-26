const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../../controller").Slide;

router.get("/", controller.getAllSlidePublic);

module.exports = router;
