const express = require("express");
const router = express.Router();
const multer = require("multer");
//controller
const controller = require("../../controller").Auth;
const middleware = require("../../middleware").Auth;

//multer upload configuration
var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./uploads/users");
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "-" + Date.now() + "." + file.mimetype.split("/")[1]);
    },
});

var upload = multer({ storage: storage }).single("userPhoto");
router.get("/all", middleware.checkAdmin, controller.getAllUsers);
router.put("/update/:id", middleware.checkAdmin, controller.updateProfileByAdmin);
router.post("/create", middleware.checkAdmin, controller.signUp);
router.put("/reset-password/:id", middleware.checkAdmin, controller.resetPassword);
router.delete("/delete/:id", middleware.checkAdmin, controller.deleteUser);
router.post("/upload-image", upload, controller.uploadImage);

module.exports = router;