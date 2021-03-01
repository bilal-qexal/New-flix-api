const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeStamp = require("mongoose-timestamp");

const ContactFormSchema = new Schema({
  status: {
    type: String,
    default: "pending",
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

ContactFormSchema.plugin(timeStamp);
module.exports = mongoose.model("ContactForm", ContactFormSchema);
