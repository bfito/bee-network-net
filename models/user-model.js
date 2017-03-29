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
  },
  // name: {
  //   type: String,
  //   required: [true, 'Name required']
  // },
  // address: {
  //   street: String,
  //   city: String,
  //   state: String,
  //   zipcode: Number,
  // },
  // userRole: {
  //   farm: Boolean,
  //   beekeeper: Boolean,
  // },
  // owndsHiveFarm: Number,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
