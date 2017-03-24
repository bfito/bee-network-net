const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: {
    type: String,
    required: [true, 'Username required']
  },
  password: {
    type: String,
    required: [true, 'Password required']
  },
  name: {
    type: String,
    required: [true, 'Name required']
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: Number,
  },
  role: {
    farm: Boolean,
    beekeeper: Boolean,
  }

});

const User = mongoose.model('User', userSchema);

module.exports = User;
