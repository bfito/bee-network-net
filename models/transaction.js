const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionsSchema = new Schema({
  transactionNumber: Number,
  dateStart: Date,
  dateEnd: Date,
  meesage: String,
  beekeeperID: Number,
  farmID: Number
});

const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;
