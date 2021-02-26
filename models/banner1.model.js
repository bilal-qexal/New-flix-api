const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const BannerSchema = new Schema({
  banner: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

BannerSchema.plugin(timestamp);
module.exports = mongoose.model("Banner", BannerSchema);
