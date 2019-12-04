const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  content: {
    type: String,
    require: [true, 'Content is required'],
  },
  commentDate: {
    type: Date,
    default: Date.now,
  }
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;