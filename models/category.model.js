
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeStamp = require("mongoose-timestamp")
const CategorySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    },
    description:{
        type:String,
        default:""
    },
    slug:{
        type:String,
        index: true
    }
})

CategorySchema.plugin(timeStamp)

function slugify(string) {
    const a = 'àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;'
    const b = 'aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------'
    const p = new RegExp(a.split('').join('|'), 'g')

    return string.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
}

CategorySchema.pre('save', async function (next) {
    this.slug = slugify(this.title);
    next();
});
module.exports = mongoose.model('Category', CategorySchema)