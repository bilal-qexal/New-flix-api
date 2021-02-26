const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../../controller").Banner;

router.get("/", controller.getAllBannersPublic);

module.exports = router;
