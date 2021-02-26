module.exports = router;
var express = require("express");
var router = express.Router();

//Routes
const unAuthenticateRoutes = require("./unauthenticated");
const authenticateRoutes = require("./authenticated");

//Middleware
const authMiddleware = require("../middleware").Auth;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Flix API' });
});


router.use("/api", unAuthenticateRoutes, authMiddleware.authenticate, authMiddleware.checkUserStatus, authenticateRoutes);

module.exports = router;