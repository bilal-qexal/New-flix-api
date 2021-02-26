//Logger
const Console = require("../helpers").Console;
const from = "Auth Controller";
const responseHelper = require("../helpers").Response;
const authHelper = require("../helpers").Auth;
const _ = require("lodash");
const { base_url } = require("../constants");

const signUp = (req, res) => {
  Console.Info(from, "signUp is called...");
  authHelper
    .signUp(req.body)
    .then((success) => responseHelper.success(res, success, "Email Verification Email Sent!"))
    .catch((error) => responseHelper.badRequest(res, error.message, error));
};

const login = (req, res) => {
  Console.Info(from, "login is called...");
  authHelper
    .login(req.body)
    .then((success) => responseHelper.success(res, success, "Login Success!"))
    .catch((error) => responseHelper.badRequest(res, "Invalid Credentials!", error));
};

const emailVerification = (req, res) => {
  Console.Info(from, "emailVerification is called...");
  authHelper
    .emailVerification(req.query.token)
    .then((verified) => res.render("email_verification", { title: "Email Verified", name: verified.first_name, image: verified.profile }))
    .catch((error) =>
      res.render("display_error", {
        title: "Link Expire",
        message: "Sorry, Your MeatUp Account email verification link is expired. Try Again!",
      })
    );
};

const resendEmailVerificationMail = (req, res) => {
  Console.Info(from, "resendEmailVerificationMail is called...");
  authHelper
    .resentEmailVerification(req.token_decoded._id)
    .then((success) => responseHelper.success(res, success, "Email Verification Email Sent!"))
    .catch((error) => responseHelper.badRequest(res, "Resent email verification request fail!", error));
};

const changePassword = (req, res) => {
  Console.Info(from, "changePassword is called...");
  authHelper
    .changePassword({ ...req.body, user: req.token_decoded._id })
    .then((success) => responseHelper.success(res, {}, "Password Changed!"))
    .catch((error) => {
      if (error.error) {
        return responseHelper.badRequest(res, error.error, error);
      } else {
        return responseHelper.badRequest(res, "Password change request fail!", error);
      }
    });
};

const resetPassword = (req, res) => {
  Console.Info(from, "resetPassword is called...");
  authHelper
    .resetPassword({ ...req.body, user: req.params.id })
    .then((success) => responseHelper.success(res, {}, "Password Changed!"))
    .catch((error) => {
      if (error.error) {
        return responseHelper.badRequest(res, error.error, error);
      } else {
        return responseHelper.badRequest(res, "Reset Password Fail!", error);
      }
    });
};

const updateProfile = (req, res) => {
  Console.Info(from, "updateProfile is called...");
  authHelper
    .updateProfile(req.body.email ? _.omit(req.body, "email") : req.body, req.token_decoded._id)
    .then((success) => responseHelper.success(res, success, "Profile Updated!"))
    .catch((error) => responseHelper.badRequest(res, "Update Profile fail!", error));
};

const updateProfileByAdmin = (req, res) => {
  Console.Info(from, "updateProfile is called...");
  authHelper
    .updateProfile(req.body, req.params.id)
    .then((success) => responseHelper.success(res, success, "Profile Updated!"))
    .catch((error) => responseHelper.badRequest(res, "Update Profile fail!", error));
};

const myProfile = (req, res) => {
  Console.Info(from, "myProfile is called...");
  authHelper
    .myProfile(req.token_decoded._id)
    .then((profile) => responseHelper.success(res, profile, "Profile Fetch!"))
    .catch((error) => responseHelper.systemFailure(res, error));
};

const blockUser = (req, res) => {
  Console.Info(from, "blockUser is called...");
  authHelper
    .blockUser({ user: req.token_decoded._id, ...req.body })
    .then((blocked) => responseHelper.success(res, {}, "User Blocked!"))
    .catch((error) => responseHelper.badRequest(res, "Unable to block!", error));
};

const unblockUser = (req, res) => {
  Console.Info(from, "unblockUser is called...");
  authHelper
    .unblockUser({ user: req.token_decoded._id, ...req.body })
    .then((blocked) => responseHelper.success(res, {}, "User unBlocked!"))
    .catch((error) => responseHelper.badRequest(res, "Unable to unBlock!", error));
};

const resendPhoneVerification = (req, res) => {
  Console.Info(from, "resendPhoneVerification is called...");
  authHelper
    .resendSMSCode(req.token_decoded._id)
    .then((sent) => responseHelper.success(res, {}, "SMS Sent!"))
    .catch((error) => responseHelper.badRequest(res, "Unable to send sms!", error));
};

const verifyPhoneVerification = (req, res) => {
  Console.Info(from, "verifyPhoneVerification is called...");
  authHelper
    .verifyPhoneCode({ user: req.token_decoded._id, code: req.body.code })
    .then((sent) => responseHelper.success(res, {}, "Phone is verified Now!"))
    .catch((error) => responseHelper.badRequest(res, "Unable to verify code!", error));
};

const forgetPassword = (req, res) => {
  Console.Info(from, "forgetPassword is called...");
  authHelper
    .forgetPassword(req.body.email)
    .then((sent) => responseHelper.success(res, {}, "Email sent, check your mail box!"))
    .catch((error) => responseHelper.badRequest(res, "Wait for 5 minutes!", error));
};

const showResetPassword = (req, res) => {
  Console.Info(from, "showResetPassword is called...");
  authHelper
    .showResetPassword(req.query.token)
    .then((found) =>
      res.render("reset_password", {
        title: "Reset Password",
        name: found.user.first_name,
        action: `/api/auth/reset-password/${req.query.token}`,
        image: found.user.profile,
      })
    )
    .catch((error) =>
      res.render("display_error", {
        title: "Invalid Request",
        message: "Sorry, Your MeatUp Account Reset Password Request is not valid. Try Again!",
      })
    );
};

const updateNewPassword = (req, res) => {
  Console.Info(from, "updateNewPassword is called...");
  authHelper
    .updateNewPassword({ token: req.params.id, password: req.body.new1, cpassword: req.body.new2 })
    .then((found) => {
      if (found)
        return res.render("display_error", {
          title: "Success",
          message: `Hi ${found.first_name}, Your password has changed successfully!`,
        });
      else
        return res.render("display_error", {
          title: "Invalid Request",
          message: "Sorry, Your MeatUp Account Reset Password Request is not valid. Try Again!",
        });
    })
    .catch((error) => {
      console.log(error);
      return res.render("display_error", { title: "Request Fail", message: error.error });
    });
};

const getProfileById = (req, res) => {
  Console.Info(from, "getProfileById is called...");
  authHelper
    .getProfileById({ uid: req.query.uid, source: req.query.source })
    .then((user) => responseHelper.success(res, user, "Request success!"))
    .catch((error) => responseHelper.badRequest(res, "Invalid Request!", error));
};

const checkEmail = (req, res) => {
  Console.Info(from, "checkEmail is called...");
  authHelper
    .checkEmail(req.body.email)
    .then((found) => {
      if (found) {
        return res.status(200).send({ status: "Success", message: "Email Found!", data: {} });
      } else return res.status(404).send({ status: "Success", message: "Email Not Found!", data: {} });
    })
    .catch((error) => responseHelper.badRequest(res, "Request Failed", error));
};

const getAllUsers = (req, res) => {
  Console.Info(from, "getAllUsers is called...");
  authHelper
    .findUser({ _id: { $ne: req.token_decoded._id } })
    .then((deleted) => responseHelper.success(res, deleted, "User Fetched successfully"))
    .catch((error) => responseHelper.badRequest(res, "User Fetch Fail!", error));
};

const deleteUser = (req, res) => {
  Console.Info(from, "deleteUser is called...");
  authHelper
    .deleteUser({ _id: req.params.id })
    .then((deleted) => responseHelper.success(res, deleted, "User deleted"))
    .catch((error) => responseHelper.badRequest(res, "Delete User Fail!", error));
};
const uploadImage = (req, res) => {
  Console.Info(from, "uploadImage is called...");
  console.log(req.file);
  if (req.file) {
    return responseHelper.success(res, { link: base_url + `/${req.file.path}` }, "File Uploaded");
  }
  // categoryHelper.upload({ parent: null })
  //     .then(done => responseHelper.success(res, done, "Successfully fetch"))
  //     .catch(error => responseHelper.badRequest(res, "Request Fail", error))
};

const uploadBanner = (req, res) => {
  Console.Info(from, "upload-Banner is called...");
  console.log(req.file);

  //   return responseHelper.success(res, { profile_url: base_url + `/${req.file.filename}` }, "Image Uploaded");

  res.send({
    success: "Successfully uploaded",
    profile_url: `http://localhost:4000/profile/${req.file.path} `,
  });
};
module.exports = {
  signUp,
  login,
  emailVerification,
  resendEmailVerificationMail,
  changePassword,
  updateProfile,
  myProfile,
  blockUser,
  unblockUser,
  resendPhoneVerification,
  verifyPhoneVerification,
  forgetPassword,
  showResetPassword,
  updateNewPassword,
  getProfileById,
  checkEmail,
  getAllUsers,
  deleteUser,
  updateProfileByAdmin,
  uploadImage,
  uploadBanner,
  resetPassword,
};
