const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const SlidesSchema = new Schema({
  slide: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

SlidesSchema.plugin(timestamp);
module.exports = mongoose.model("Slide", SlidesSchema);
