const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeStamp = require("mongoose-timestamp");

const AboutUsSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

AboutUsSchema.plugin(timeStamp);
module.exports = mongoose.model("About", AboutUsSchema);
