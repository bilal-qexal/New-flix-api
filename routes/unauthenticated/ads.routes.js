const express = require("express");
const router = express.Router();
const multer = require("multer");

const controller = require("../../controller").Ads;

router.get("/", controller.getAllAdsPublic);

module.exports = router;
