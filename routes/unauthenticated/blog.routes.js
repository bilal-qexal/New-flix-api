const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").Blog;

router.get("/", controller.getAllPublic);

module.exports = router;
