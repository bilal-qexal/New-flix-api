const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeZone = require('mongoose-timezone');

const ForgetSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    code: {
        type: String,
        required: true
    },
    expire_at: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })
ForgetSchema.plugin(timeZone, { paths: ['expire_at'] });
module.exports = mongoose.model('ForgetPassword', ForgetSchema)