const express = require("express");
const router = express.Router();
const multer = require("multer");

const middleware = require("../../middleware").Auth;
const controller = require("../../controller").Actor


var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/actors");
    },
    filename: function (req, file, callback) {
        console.log(file)
        callback(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
    }
});




var upload = multer({ storage: storage }).single("actorPhoto");


router.post("/create", middleware.checkAdmin, controller.signUp);
router.get("/all", middleware.checkAdmin, controller.getAllActors);
router.post("/upload-image", upload, controller.uploadImage);
router.delete("/delete/:id", middleware.checkAdmin, controller.deleteActor);
router.put("/update/:id", middleware.checkAdmin, controller.updateActorByAdmin);

module.exports = router;