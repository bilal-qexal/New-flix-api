const express = require("express");
const router = express.Router();

const controller = require("../../controller").Auth;
//middleware
const middleware = require("../../middleware").Auth;

router.get("/my-profile", controller.myProfile);
router.get("/resend-verification-email", controller.resendEmailVerificationMail);
router.post("/change-password", middleware.checkVerifiedEmail, controller.changePassword);
router.post("/update-profile", middleware.checkVerifiedEmail, controller.updateProfile);
router.post("/block-user", middleware.checkAdmin, controller.blockUser);
router.post("/unblock-user", middleware.checkAdmin, controller.unblockUser);
router.get("/resend-verification-phone", controller.resendPhoneVerification);
router.post("/verify-phone-code", controller.verifyPhoneVerification);
router.delete("/delete/:id", middleware.checkAdmin, controller.deleteUser);

module.exports = router;