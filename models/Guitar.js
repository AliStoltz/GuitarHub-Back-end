mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Comment = require('./Comment');

const GuitarSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, 'Guitar name required'],
  },
  photo: {
    type: String,
    require: [true, 'A photo is required'],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  condition: {
    type: String,
    require: [true, 'Condition is required'],
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: [true, 'A price is required'],
  },
  postDate: {
    type: Date,
    default: Date.now,
  },
  comments: [Comment.schema],
});

const Guitar = mongoose.model('Guitar', GuitarSchema);

module.exports = Guitar;