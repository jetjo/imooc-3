// Comment.js

const mongoose = require('../db/db');

const CommentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  userName: String
}, {
  timestamps: true
});

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = {
  Comment,
  CommentSchema
}
