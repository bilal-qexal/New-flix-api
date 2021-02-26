var jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = mongoose.model("User");

const authenticate = (req, res, next) => {
    var authorization = req.header("Authorization");
    if (authorization) {
        var token = authorization.split(" ");
        jwt.verify(token[1], process.env.JWT_SECRET, function (err, token_decoded) {
            if (err) {
                return res.status(400).send({ success: false, message: "Failed to authenticate token." });
            } else
                User.findById(token_decoded._id).then((user) => {
                    if (user) {
                        req.token_decoded = token_decoded;
                        next();
                    } else {
                        return res.status(400).json({ success: false, message: "Failed to authenticate token." });
                    }
                });
        });
    } else return res.status(403).send({ success: false, message: "No Token Provided" });

};

// check if request has admin role/access
const checkAdmin = (req, res, next) => {
    console.log(req.token_decoded);
    if (req.token_decoded.role == "admin") {
        next();
    } else {
        return res.status(403).send({ success: false, message: "Invalid Access!" });
    }
};

const validateAdminUnAuth = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user)
            if (user.role == "admin") next();
            else return res.status(403).send({ success: false, message: "Invalid Access!" });
        else return res.status(400).send({ success: false, message: "No Account Found!" });
    });
};

// check login request user status if active
const checkLoginUserStatus = (req, res, next) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            if (user.status === "active") next();
            else return res.status(403).send({ success: false, message: `Your account has been ${user.status} by Admin!` });
        } else return res.status(404).send({ success: false, message: `No Account Found!` });
    });
};

// check user status
const checkUserStatus = (req, res, next) => {
    User.findById(req.token_decoded._id).then((user) => {
        if (user.status === "active") next();
        else return res.status(403).send({ success: false, message: `Your account has been ${user.status} by Admin!` });
    });
};

const checkVerifiedEmail = (req, res, next) => {
    User.findById(req.token_decoded._id).then((user) => {
        if (user.isEmailVerified) next();
        else return res.status(400).send({ success: false, message: `Your email is not verified!` });
    });
}
module.exports = { authenticate, checkAdmin, validateAdminUnAuth, checkLoginUserStatus, checkUserStatus, checkVerifiedEmail };