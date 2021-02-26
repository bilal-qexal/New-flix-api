const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").TopbarContent;
const middleware = require("../../middleware").Auth;

// router.post("/create", middleware.checkAdmin, controller.createAbout);
router.put("/", middleware.checkAdmin, controller.topbarContent);
// router.get("/create", middleware.checkAdmin, controller.getAll);

module.exports = router;
