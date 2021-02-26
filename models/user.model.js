const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");
const { user_status } = require("../constants");

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  status: {
    type: String,
    default: "active",
    enum: user_status,
  },
  email: {
    type: String,
    required: true,
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    default: "",
  },
  isPhoneVerified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    default: "",
  },
  username: {
    type: String,
    default: "",
  },
  profile: {
    type: String,
    default: "/images/default_user.png",
  },
});

UserSchema.plugin(timestamp);
module.exports = mongoose.model("User", UserSchema);
