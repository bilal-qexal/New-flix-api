const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeStamp = require("mongoose-timestamp");

const TopbarContentSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

TopbarContentSchema.plugin(timeStamp);
module.exports = mongoose.model("TopbarContent", TopbarContentSchema);
