
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeStamp = require("mongoose-timestamp")

const TagSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    color:{
        type:String,
        default:""
    },
})

TagSchema.plugin(timeStamp)
module.exports = mongoose.model('Tag', TagSchema)