const mongoose = require('./db')

const MessageBoardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  content: String
}, {
  timestamps: true
});

const MessageBoard = mongoose.model('MessageBoard', MessageBoardSchema);

module.exports = {
  MessageBoardSchema,
  MessageBoard
}
