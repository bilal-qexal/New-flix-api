const express = require("express");
const router = express.Router();
const multer = require("multer");

const middleware = require("../../middleware").Auth;
const controller = require("../../controller").Banner;

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/banner");
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

var upload = multer({ storage: storage }).single("bannerPhoto");

router.get("/protected", middleware.checkAdmin, controller.getAllBannersProtected);
router.post("/", middleware.checkAdmin, upload, controller.uploadBanner);
router.put("/:id", middleware.checkAdmin, controller.updateBanner);
router.delete("/:id", middleware.checkAdmin, controller.deleteBanner);

module.exports = router;
