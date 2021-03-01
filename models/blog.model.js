const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timeStamp = require('mongoose-timestamp');

const BlogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_LKMQ9yuUe4qDAsNQEoN6RBB_NAnYG53aJg',
  },
  visibility: {
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  priority: {
    type: Number,
    default: 0,
  },
  movies: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  description: {
    type: String,
    default: '',
  },
});

BlogSchema.plugin(timeStamp);
module.exports = mongoose.model('Blog', BlogSchema);
