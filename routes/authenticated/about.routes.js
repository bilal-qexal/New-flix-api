const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").About;
const middleware = require("../../middleware").Auth;

// router.post("/create", middleware.checkAdmin, controller.createAbout);
router.put("/", middleware.checkAdmin, controller.about);
// router.get("/create", middleware.checkAdmin, controller.getAll);

module.exports = router;
