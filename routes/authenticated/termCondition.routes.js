const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").TermCondition;
const middleware = require("../../middleware").Auth;

// router.post("/create", middleware.checkAdmin, controller.createAbout);
router.put("/", middleware.checkAdmin, controller.termsAndCondition);
// router.get("/create", middleware.checkAdmin, controller.getAll);

module.exports = router;
