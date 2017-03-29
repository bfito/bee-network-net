// 'use strict';

const mongoose = require('mongoose');

const apiaryFarmSchema = new mongoose.Schema({
  owner: Number,
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  state: {
    type: String,
    required: [true, 'Sate is required']
  },
  PostDate: Date,
  StartDate: Date,
  EndDate: Date,
  message: String
});

const ApiaryFarm = mongoose.model('ApiaryFarm', apiaryFarmSchema);

module.exports = ApiaryFarm;
