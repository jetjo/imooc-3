const mongoose = require('./db')

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  city: String
}, {
  timestamps: true
})

const User = mongoose.model('User', UserSchema);

module.exports = {
  UserSchema,
  User
};
