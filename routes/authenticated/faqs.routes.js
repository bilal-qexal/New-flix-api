const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").FAQs;
const middleware = require("../../middleware").Auth;

router.post("/", middleware.checkAdmin, controller.createFAQs);
router.put("/:id", middleware.checkAdmin, controller.updateFAQs);
router.delete("/:id", middleware.checkAdmin, controller.deleteFAQs);

module.exports = router;
