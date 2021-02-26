const express = require("express");
const router = express.Router();
const multer = require("multer");

const middleware = require("../../middleware").Auth;
const controller = require("../../controller").Slide;

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads/slide");
  },
  filename: function (req, file, callback) {
    console.log(file);
    callback(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
  },
});

var upload = multer({ storage: storage }).single("slidePhoto");

router.get("/protected", middleware.checkAdmin, controller.getAllSlideProtected);
router.post("/", middleware.checkAdmin, upload, controller.uploadSlide);
router.put("/:id", middleware.checkAdmin, controller.updateSlide);
router.delete("/:id", middleware.checkAdmin, controller.deleteSlide);

module.exports = router;
