const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").Tag;

router.get("/all", controller.getAll);

module.exports = router;