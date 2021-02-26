const express = require("express");
const router = express.Router();

//Controller
const controller = require("../../controller").Auth;
//middleware
const middleware = require("../../middleware").Auth;

router.post("/signup", controller.signUp);
router.post("/login", middleware.checkLoginUserStatus, controller.login);
// router.post("/admin/login", middleware.validateAdminUnAuth, controller.login);
router.post("/forget-password", middleware.checkLoginUserStatus, controller.forgetPassword);
router.get("/email-verification", controller.emailVerification);
router.post("/reset-password/:id", controller.updateNewPassword);
router.get("/reset-password", controller.showResetPassword);
router.post("/check-email", controller.checkEmail);

module.exports = router;