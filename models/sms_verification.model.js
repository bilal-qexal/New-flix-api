
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const SMSSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    code: {
        type: Number,
        required: true
    },
    expire_at: {
        type: Date,
        default: Date.now
    }
})
SMSSchema.plugin(timeZone, { paths: ['expire_at'] });
module.exports = mongoose.model('PhoneVerification', SMSSchema)