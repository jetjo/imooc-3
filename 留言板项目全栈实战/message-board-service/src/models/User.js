// User.js

const mongoose = require('../db/db')

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  age: Number,
  city: String,
  gender: {
    type: Boolean,
    default: 0 //0:保密 1:男 2:女
  }

}, {
  timestamps: true
})

const User = mongoose.model('User', UserSchema);

module.exports = {
  User,
  UserSchema
}
