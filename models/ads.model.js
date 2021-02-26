const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timestamp = require("mongoose-timestamp");

const AdsSchema = new Schema({
  ads: {
    type: String,
    required: true,
  },
  visibility: {
    type: Boolean,
    default: true,
  },
});

AdsSchema.plugin(timestamp);
module.exports = mongoose.model("Ads", AdsSchema);
