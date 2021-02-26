const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeStamp = require("mongoose-timestamp");

const FaqsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

FaqsSchema.plugin(timeStamp);
module.exports = mongoose.model("FAQs", FaqsSchema);
