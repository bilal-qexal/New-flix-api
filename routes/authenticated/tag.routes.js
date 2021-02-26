const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").Tag;
const middleware = require("../../middleware").Auth;


router.post("/create", middleware.checkAdmin, controller.createTag);
router.put("/update/:id", middleware.checkAdmin, controller.updateTag);
router.delete("/delete/:id", middleware.checkAdmin, controller.deleteTag);

module.exports = router;