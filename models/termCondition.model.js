const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const timeStamp = require("mongoose-timestamp");

const TermConditionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
});

TermConditionSchema.plugin(timeStamp);
module.exports = mongoose.model("TermCondition", TermConditionSchema);
