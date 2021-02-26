const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").Category;

router.get("/all", controller.getAll);

module.exports = router;