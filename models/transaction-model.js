const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  // transactionNumber: Number,
  location: String,
  dateStart: Date,
  dateEnd: Date,
  meesage: String,
  // Check excercise
  // beekeeperID: ObjectIds,
  farmID: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
