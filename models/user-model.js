const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: [true, 'Username required']
  },
  email: {
    type: String,
    required: [true, 'Email required']
  },
  password: {
    type: String,
    required: [true, 'Password required']
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
