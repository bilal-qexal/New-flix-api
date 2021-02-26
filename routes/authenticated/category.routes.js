const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").Category;
const middleware = require("../../middleware").Auth;


router.post("/create", middleware.checkAdmin, controller.createCategory);
router.put("/update/:id", middleware.checkAdmin, controller.updateCategory);
router.delete("/delete/:id", middleware.checkAdmin, controller.deleteCategory);

module.exports = router;