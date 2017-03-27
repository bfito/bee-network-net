// 'use strict';

const mongoose = require('mongoose');

const apiaryFarmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  state: {
    type: String,
    required: [true, 'Sate is required']
  }
});

const ApiaryFarm = mongoose.model('ApiaryFarm', apiaryFarmSchema);

module.exports = ApiaryFarm;
