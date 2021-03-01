const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").Blog;
const middleware = require("../../middleware").Auth;

router.post("/", middleware.checkAdmin, controller.createBlog);
router.put("/:id", middleware.checkAdmin, controller.updateBlog);
router.delete("/:id", middleware.checkAdmin, controller.deleteBlog);
router.get("/protected", middleware.checkAdmin, controller.getAllProtected);

module.exports = router;
