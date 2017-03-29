const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  // listingNumber: Number,
    FarmApiary: String,
    StartDate: Date,
    EndDate: Date,
    Email: String,
    Address: String,
    City: String,
    State: String,
    postalCode: Number
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
