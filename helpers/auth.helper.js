const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Auth Helper";
const constants = require("../constants");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const moment = require("moment");
//Mongoose and models
const mongoose = require("mongoose");
const User = mongoose.model("User");
const EmailVerification = mongoose.model("EmailVerification");
const PhoneVerification = mongoose.model("PhoneVerification");
const ForgetPassword = mongoose.model("ForgetPassword");
// const smsHelper = require("./sendSMS.helper");

const signUp = (data) => {
  Console.Info(from, "signUp is called...");
  return new Promise((resolve, reject) => {
    validateUserSingUp(data)
      .then((noIssue) => {
        data.password = data.password ? data.password : "flix";
        data.password = bcrypt.hashSync(data.password, bcrypt.genSaltSync(10));
        data.is_manual = true;
        data.username = data.email.split("@")[0];
        createUser(data).then((created) => {
          sendEmailVerification(created);
          generateToken(created).then((token) =>
            resolve({
              user: _.pick(created, constants.user_pick_sign_up),
              token: token,
            })
          );
        });
      })
      .catch((error) => reject(error));
  });
};

const validateUserSingUp = (data) => {
  Console.Info(from, "validateUserSingUp is called...");
  return new Promise((resolve, reject) => {
    let queries = [];
    if (data.email) {
      queries.push({ email: data.email });
    }
    if (data.name) {
      queries.push({ name: data.name });
    }
    if (data.phone) {
      queries.push({ phone: data.phone });
    }
    User.find({ $or: queries })
      .then((users) => {
        if (users.length > 0) return reject({ message: "Already register!" });
        else return resolve();
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};
const login = (data) => {
  Console.Info(from, "login is called...");
  return new Promise((resolve, reject) => {
    findUser({ email: data.email })
      .then((user) => {
        if (user.length > 0) {
          if (!bcrypt.compareSync(data.password, user[0].password))
            return reject({ error: "Invalid Credentials!" });
          else {
            updateOneUser({ email: data.email }, { last_seen: Date.now() });
            generateToken(user[0]).then((token) =>
              resolve({
                user: _.pick(user[0], constants.user_pick_sign_up),
                token: token,
              })
            );
          }
        } else return reject({ error: "Invalid Credentials!" });
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

// find all users
const findUser = (query) => {
  Console.Info(from, "findUser is called...");
  return new Promise((resolve, reject) => {
    User.find(query) /*.populate({ path: "permission", model: "Permission" })*/
      .then((users) => resolve(users))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const createUser = (data) => {
  Console.Info(from, "createUser is called...");
  return new Promise((resolve, reject) => {
    User.create(data)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const generateToken = (user) => {
  Console.Info(from, "generateToken is called...");
  return new Promise((resolve, reject) => {
    var token = jwt.sign(
      {
        email: user.email,
        _id: user._id,
        role: user.role,
        status: user.status,
        isEmailVerified: user.isEmailVerified,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "10 years",
      }
    );
    return resolve(token);
  });
};

const checkEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then((found) => resolve(found ? 1 : 0))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const sendEmail = (data) => {
  Console.Info(from, "sendEmail is called...");
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.My_EMAIL,
        pass: process.env.My_EMAIL_PASSWORD,
      },
    });
    console.log(data);
    var mailOptions = {
      from: process.env.My_EMAIL,
      to: data.email,
      subject: `Email Verification - ${process.env.APP_NAME}`,
      html: `<!DOCTYPE html>
            <html>
            
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }
            
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }
            
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }
            
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }
            
                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
            
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
            
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
            
                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
            
                        table {
                            border-collapse: collapse !important;
                        }
            
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
            
                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
            
                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }
            
                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
                </head>
            
                <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#FFA73B" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            <h6 style="font-size: 32px; font-weight: 400; margin: 2;">Welcome ${data.first_name}!</h6> <img src="${data.profile}" width="125" height="120" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">We're excited to have you get started. First, you need to confirm your account. Just press the button below.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${data.url}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;"><a href="${data.url}" target="_blank" style="color: #FFA73B;">${data.url}</a></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">Cheers,<br>MeatUp Team</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                            <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            
            </html>`,
      // text: data.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        Console.Error(from, error);
        return reject(error);
      } else {
        Console.Success(from, "Email Sent!");
        return resolve(info);
      }
    });
  });
};

const sendEmailVerification = (data) => {
  Console.Info(from, "sendEmailVerification is called...");
  return new Promise((resolve, reject) => {
    var token = crypto.randomBytes(50).toString("hex");
    createVerification({ user: data._id, code: token }).then((created) => {
      sendEmail({
        ...data._doc,
        url: `${constants.base_url}/api/auth/email-verification?token=${token}`,
      })
        .then((sent) => resolve(sent))
        .catch((error) => reject(error));
    });
  });
};

const createVerification = (data) => {
  Console.Info(from, "createVerification is called...");
  return new Promise((resolve, reject) => {
    EmailVerification.create(data)
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const emailVerification = (token) => {
  Console.Info(from, "emailVerification is called...");
  return new Promise((resolve, reject) => {
    Console.Warning(from, moment().format());
    EmailVerification.findOne({ code: token }).then((verification) => {
      var diff =
        new Date().getTime() - new Date(verification.expire_at).getTime();
      if (verification && diff <= constants.email_verification_expire_minutes) {
        User.findByIdAndUpdate(
          verification.user,
          { isEmailVerified: true },
          { new: true }
        )
          .then((user) => {
            EmailVerification.deleteOne({ code: token })
              .then((deleted) => {
                if (deleted.deletedCount > 0) return resolve(user);
                else reject({ error: "Server Error!" });
              })
              .catch((error) => {
                Console.Error(from, error);
                return reject(error);
              });
          })
          .catch((error) => {
            Console.Error(from, error);
            return reject(error);
          });
      } else {
        Console.Warning(from, "deleted Invalid Code!");
        EmailVerification.deleteOne({ code: token });
        return reject({ error: "Invalid Token" });
      }
    });
  });
};

const resentEmailVerification = (user) => {
  Console.Info(from, "resentEmailVerification is called....");
  return new Promise((resolve, reject) => {
    EmailVerification.deleteMany({ user: user }).then((oldRemoved) => {
      findUser({ _id: user })
        .then((userFound) => {
          if (userFound.length > 0) {
            if (userFound[0].isEmailVerified) {
              return reject({ error: "Email Already Verified!" });
            } else {
              sendEmailVerification(userFound[0]);
              return resolve(true);
            }
          } else return reject({ error: "Server Error!" });
        })
        .catch((error) => {
          Console.Error(from, error);
          return reject(error);
        });
    });
  });
};

const updateOneUser = (query, values) => {
  Console.Info(from, "updateUser is called...");
  return new Promise((resolve, reject) => {
    User.findOneAndUpdate(query, values, { new: true })
      .then((updated) => resolve(updated))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const changePassword = (data) => {
  Console.Info(from, "changePassword is called...");
  return new Promise((resolve, reject) => {
    findUser({ _id: data.user }).then((user) => {
      user = user[0];
      if (user.password === "") {
        updateOneUser(
          { _id: data.user },
          {
            password: bcrypt.hashSync(data.new, bcrypt.genSaltSync(10)),
            is_manual: true,
          }
        )
          .then((done) => resolve(done))
          .catch((error) => {
            Console.Error(from, error);
            return reject(error);
          });
      } else if (!bcrypt.compareSync(data.current, user.password))
        return reject({ error: "Invalid Current Password!" });
      else {
        updateOneUser(
          { _id: data.user },
          { password: bcrypt.hashSync(data.new, bcrypt.genSaltSync(10)) }
        )
          .then((done) => resolve(done))
          .catch((error) => {
            Console.Error(from, error);
            return reject(error);
          });
      }
    });
  });
};

const resetPassword = (data) => {
  Console.Info(from, "resetPassword is called...");
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      data.user,
      { password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)) },
      { new: true }
    )
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateProfile = (data, user) => {
  Console.Info(from, "updateProfile is called...");
  return new Promise((resolve, reject) => {
    updateOneUser({ _id: user }, data)
      .then((updated) => {
        resolve(updated);
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const myProfile = (user) => {
  Console.Info(from, "myProfile is called...");
  return new Promise((resolve, reject) => {
    findUser({ _id: user })
      .then((users) => resolve(_.pick(users[0], constants.user_pick_profile)))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const blockUser = (data) => {
  Console.Info(from, "blockUser is called...");
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      data.user,
      { $addToSet: { block: data.block } },
      { new: true }
    )
      .then((blocked) => resolve(blocked))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const unblockUser = (data) => {
  Console.Info(from, "unblockUser is called...");
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(
      data.user,
      { $pull: { block: data.block } },
      { new: true }
    )
      .then((blocked) => resolve(blocked))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const resendSMSCode = (user) => {
  Console.Info(from, "resendSMSCode is called...");
  return new Promise((resolve, reject) => {
    findUser({ _id: user }).then((userFound) => {
      if (userFound.length > 0) {
        if (!_.trim(userFound[0].phone))
          return reject({ error: "No Phone Number Provided!" });
        else if (userFound[0].isPhoneVerified) {
          return reject({ error: "Phone Number Already Verified!" });
        } else
          PhoneVerification.findOne({ user: user }).then((alreadySent) => {
            if (alreadySent) {
              var diff =
                new Date().getTime() -
                new Date(alreadySent.expire_at).getTime();
              if (diff <= constants.sms_verification_expire_minutes)
                return reject({
                  error: `Wait for ${
                    constants.sms_verification_expire_minutes / 1000
                  } seconds to resend!`,
                });
              else
                processPhoneSMS(userFound[0])
                  .then((done) => resolve(done))
                  .catch((error) => reject(error));
            } else
              processPhoneSMS(userFound[0])
                .then((done) => resolve(done))
                .catch((error) => reject(error));
          });
      } else return reject({ error: "Server Error" });
    });
  });
};

const processPhoneSMS = (user) => {
  Console.Info(from, "processPhoneSMS is called...");
  return new Promise((resolve, reject) => {
    var code = Math.floor(100000 + Math.random() * 900000);
    smsHelper
      .sendSMS({
        message: `Hi ${user.first_name}, your Meat Up verification code is: ${code} `,
        to: user.phone,
      })
      .then((sent) =>
        PhoneVerification.findOneAndUpdate(
          { user: user._id },
          { user: user._id, code: code, expire_at: Date.now() },
          { upsert: true }
        )
          .then((done) => resolve(sent))
          .catch((error) => {
            Console.Error(from, error);
            return reject(error);
          })
      )
      .catch((error) => reject(error));
  });
};

const verifyPhoneCode = (data) => {
  Console.Info(from, "verifyPhoneCode is called...");
  return new Promise((resolve, reject) => {
    PhoneVerification.findOneAndDelete({
      user: data.user,
      code: data.code,
    }).then((verified) => {
      if (!verified) return reject({ error: "Invalid Code!" });
      else
        User.findByIdAndUpdate(
          data.user,
          { isPhoneVerified: true },
          { new: true }
        )
          .then((done) => resolve(done))
          .catch((error) => {
            Console.Error(from, error);
            return reject(error);
          });
    });
  });
};

const sendForgetPasswordEmail = (data) => {
  Console.Info(from, "sendForgetPasswordEmail is called...");
  return new Promise((resolve, reject) => {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.My_EMAIL,
        pass: process.env.My_EMAIL_PASSWORD,
      },
    });
    var mailOptions = {
      from: process.env.My_EMAIL,
      to: data.email,
      subject: `Reset Password - ${process.env.APP_NAME}`,
      html: `<!DOCTYPE html>
            <html>
            
                <head>
                    <title></title>
                    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <style type="text/css">
                        @media screen {
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 400;
                                src: local('Lato Regular'), local('Lato-Regular'), url(https://fonts.gstatic.com/s/lato/v11/qIIYRU-oROkIk8vfvxw6QvesZW2xOQ-xsNqO47m55DA.woff) format('woff');
                            }
            
                            @font-face {
                                font-family: 'Lato';
                                font-style: normal;
                                font-weight: 700;
                                src: local('Lato Bold'), local('Lato-Bold'), url(https://fonts.gstatic.com/s/lato/v11/qdgUG4U09HnJwhYI-uK18wLUuEpTyoUstqEm5AMlJo4.woff) format('woff');
                            }
            
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 400;
                                src: local('Lato Italic'), local('Lato-Italic'), url(https://fonts.gstatic.com/s/lato/v11/RYyZNoeFgb0l7W3Vu1aSWOvvDin1pK8aKteLpeZ5c0A.woff) format('woff');
                            }
            
                            @font-face {
                                font-family: 'Lato';
                                font-style: italic;
                                font-weight: 700;
                                src: local('Lato Bold Italic'), local('Lato-BoldItalic'), url(https://fonts.gstatic.com/s/lato/v11/HkF_qI1x_noxlxhrhMQYELO3LdcAZYWl9Si6vvxL-qU.woff) format('woff');
                            }
                        }
            
                        /* CLIENT-SPECIFIC STYLES */
                        body,
                        table,
                        td,
                        a {
                            -webkit-text-size-adjust: 100%;
                            -ms-text-size-adjust: 100%;
                        }
            
                        table,
                        td {
                            mso-table-lspace: 0pt;
                            mso-table-rspace: 0pt;
                        }
            
                        img {
                            -ms-interpolation-mode: bicubic;
                        }
            
                        /* RESET STYLES */
                        img {
                            border: 0;
                            height: auto;
                            line-height: 100%;
                            outline: none;
                            text-decoration: none;
                        }
            
                        table {
                            border-collapse: collapse !important;
                        }
            
                        body {
                            height: 100% !important;
                            margin: 0 !important;
                            padding: 0 !important;
                            width: 100% !important;
                        }
            
                        /* iOS BLUE LINKS */
                        a[x-apple-data-detectors] {
                            color: inherit !important;
                            text-decoration: none !important;
                            font-size: inherit !important;
                            font-family: inherit !important;
                            font-weight: inherit !important;
                            line-height: inherit !important;
                        }
            
                        /* MOBILE STYLES */
                        @media screen and (max-width:600px) {
                            h1 {
                                font-size: 32px !important;
                                line-height: 32px !important;
                            }
                        }
            
                        /* ANDROID CENTER FIX */
                        div[style*="margin: 16px 0;"] {
                            margin: 0 !important;
                        }
                    </style>
                </head>
            
                <body style="background-color: #f4f4f4; margin: 0 !important; padding: 0 !important;">
                    <!-- HIDDEN PREHEADER TEXT -->
                    <div style="display: none; font-size: 1px; color: #fefefe; line-height: 1px; font-family: 'Lato', Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;"> We're thrilled to have you here! Get ready to dive into your new account. </div>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <!-- LOGO -->
                        <tr>
                            <td bgcolor="#FFA73B" align="center">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td align="center" valign="top" style="padding: 40px 10px 40px 10px;"> </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#FFA73B" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="center" valign="top" style="padding: 40px 20px 20px 20px; border-radius: 4px 4px 0px 0px; color: #111111; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; letter-spacing: 4px; line-height: 48px;">
                                            <h6 style="font-size: 32px; font-weight: 400; margin: 2;">Welcome ${data.first_name}!</h6> <img src="${data.profile}" width="125" height="120" style="display: block; border: 0px;" />
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 40px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">We're excited to have you back into to again get started. First, you need to confirm your account. Just press the button below.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left">
                                            <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                <tr>
                                                    <td bgcolor="#ffffff" align="center" style="padding: 20px 30px 60px 30px;">
                                                        <table border="0" cellspacing="0" cellpadding="0">
                                                            <tr>
                                                                <td align="center" style="border-radius: 3px;" bgcolor="#FFA73B"><a href="${data.url}" target="_blank" style="font-size: 20px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; color: #ffffff; text-decoration: none; padding: 15px 25px; border-radius: 2px; border: 1px solid #FFA73B; display: inline-block;">Confirm Account</a></td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 0px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">If that doesn't work, copy and paste the following link in your browser:</p>
                                        </td>
                                    </tr> <!-- COPY -->
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 20px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;"><a href="${data.url}" target="_blank" style="color: #FFA73B;">${data.url}</a></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 20px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">If you have any questions, just reply to this email—we're always happy to help out.</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td bgcolor="#ffffff" align="left" style="padding: 0px 30px 40px 30px; border-radius: 0px 0px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <p style="margin: 0;">Cheers,<br>MeatUp Team</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 30px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#FFECD1" align="center" style="padding: 30px 30px 30px 30px; border-radius: 4px 4px 4px 4px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 25px;">
                                            <h2 style="font-size: 20px; font-weight: 400; color: #111111; margin: 0;">Need more help?</h2>
                                            <p style="margin: 0;"><a href="#" target="_blank" style="color: #FFA73B;">We&rsquo;re here to help you out</a></p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td bgcolor="#f4f4f4" align="center" style="padding: 0px 10px 0px 10px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                                    <tr>
                                        <td bgcolor="#f4f4f4" align="left" style="padding: 0px 30px 30px 30px; color: #666666; font-family: 'Lato', Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;"> <br>
                                            <p style="margin: 0;">If these emails get annoying, please feel free to <a href="#" target="_blank" style="color: #111111; font-weight: 700;">unsubscribe</a>.</p>
                                        </td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                    </table>
                </body>
            
            </html>`,
      // text: data.text
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        Console.Error(from, error);
        return reject(error);
      } else {
        Console.Success(from, "Email Sent!");
        return resolve(info);
      }
    });
  });
};

const forgetPassword = (email) => {
  Console.Info(from, "forgetPassword is called...");
  return new Promise((resolve, reject) => {
    findUser({ email: email }).then((user) => {
      if (user.length > 0) {
        ForgetPassword.findOne({ user: user[0]._id }).then((already) => {
          if (already) {
            var diff =
              new Date().getTime() - new Date(already.expire_at).getTime();
            if (diff <= constants.forget_password_expire_minutes)
              return reject({
                error: `Wait for ${
                  constants.forget_password_expire_minutes / 60000
                } minutes to resend!`,
              });
            else
              processForgetPassword(user[0])
                .then((done) => resolve(true))
                .catch((error) => reject(error));
          } else
            processForgetPassword(user[0])
              .then((done) => resolve(true))
              .catch((error) => reject(error));
        });
      } else return reject({ error: "No User found!" });
    });
  });
};

const processForgetPassword = (data) => {
  Console.Info(from, "processForgetPassword is called...");
  return new Promise((resolve, reject) => {
    var token = crypto.randomBytes(50).toString("hex");
    sendForgetPasswordEmail({
      ...data._doc,
      url: `${constants.base_url}/api/auth/reset-password?token=${token}`,
    })
      .then((sent) => {
        ForgetPassword.deleteMany({ user: data._id }).then((clear) => {
          ForgetPassword.create({ user: data._id, code: token })
            .then((updated) => resolve(updated))
            .catch((error) => {
              Console.Error(from, error);
              return reject(error);
            });
        });
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const showResetPassword = (token) => {
  Console.Info(from, "showResetPassword is called...");
  return new Promise((resolve, reject) => {
    ForgetPassword.findOne({ code: token })
      .populate("user")
      .then((found) => {
        var diff = new Date().getTime() - new Date(found.expire_at).getTime();
        if (diff <= constants.forget_password_expire_minutes)
          return resolve(found);
        else return reject({ error: "Token Expire!" });
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateNewPassword = (data) => {
  Console.Info(from, "updateNewPassword is called...");
  return new Promise((resolve, reject) => {
    if (data.password !== data.cpassword)
      return reject({ error: "Password not match!" });
    else
      ForgetPassword.findOne({ code: data.token })
        .populate("user")
        .then((found) => {
          var diff = new Date().getTime() - new Date(found.expire_at).getTime();
          if (diff <= constants.forget_password_expire_minutes) {
            User.findByIdAndUpdate(
              found.user._id,
              {
                password: bcrypt.hashSync(
                  data.password,
                  bcrypt.genSaltSync(10)
                ),
              },
              { new: true }
            )
              .then((updated) =>
                ForgetPassword.deleteMany({
                  user: found.user._id,
                }).then((done) => resolve(updated))
              )
              .catch((error) => {
                Console.Error(from, error);
                return reject(error);
              });
          } else return reject({ error: "Token Expire!" });
        })
        .catch((error) => {
          Console.Error(from, error);
          return reject(error);
        });
  });
};

const getProfileById = (data) => {
  Console.Info(from, "getProfileById is called...");
  return new Promise((resolve, reject) => {
    if (data.source !== "facebook" && data.source !== "google")
      return reject({ error: "Invalid Source Provided" });
    else {
      User.findOne({
        social: { $elemMatch: { source: data.source, uid: data.uid } },
      })
        .then((user) =>
          user
            ? generateToken(user).then((token) =>
                resolve({
                  user: _.pick(user, constants.user_pick_sign_up),
                  token: token,
                })
              )
            : resolve({})
        )
        .catch((error) => {
          Console.Error(from, error);
          return reject(error);
        });
    }
  });
};

const deleteUser = (query) => {
  Console.Info(from, "deleteUser is called...");
  return new Promise((resolve, reject) => {
    User.findOneAndDelete(query)
      .then((user) => {
        return resolve(user);
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  signUp,
  login,
  emailVerification,
  resentEmailVerification,
  changePassword,
  updateProfile,
  myProfile,
  blockUser,
  unblockUser,
  resendSMSCode,
  verifyPhoneCode,
  forgetPassword,
  showResetPassword,
  updateNewPassword,
  getProfileById,
  checkEmail,
  updateOneUser,
  deleteUser,
  findUser,
  resetPassword,
};
