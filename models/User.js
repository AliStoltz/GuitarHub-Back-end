const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, 'username is required'],
  },
  email: {
    type: String,
    require: [true, 'Email is required'],
    unique: true,
  },
  location: {
    type: String,
    require: [true, 'Location is required'],
  },
  password: {
    type: String,
    require: [true, 'Password is required'],
    // select: false,
  }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;