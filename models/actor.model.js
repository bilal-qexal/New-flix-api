const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const ActorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    info: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model("Actor", ActorSchema);