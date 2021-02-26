const express = require("express");
const router = express.Router();
const multer = require("multer");

const middleware = require("../../middleware").Auth;
const controller = require("../../controller").Ads;

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/ads");
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

var upload = multer({ storage: storage }).single("adsPhoto");

router.get("/protected", middleware.checkAdmin, controller.getAllAdsProtected);
router.post("/", middleware.checkAdmin, upload, controller.uploadAds);
router.put("/:id", middleware.checkAdmin, controller.updateAds);
router.delete("/:id", middleware.checkAdmin, controller.deleteAds);

module.exports = router;
