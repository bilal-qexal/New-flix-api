const express = require("express");
const router = express.Router();
//controller
const controller = require("../../controller").ContactForm;
const middleware = require("../../middleware").Auth;

router.get("/", middleware.checkAdmin, controller.getAll);
router.put("/:id", middleware.checkAdmin, controller.updateContactForm);
router.delete("/:id", middleware.checkAdmin, controller.deleteContactForm);

module.exports = router;
