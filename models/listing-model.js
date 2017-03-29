const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const listingSchema = new Schema({
  // listingNumber: Number,
    Author: Number,
    // name:      '',
    // location:  '',
    // postDate:  '',
    // startDate: '',
    // endDate:   '',
    // message:   '',
    Address: String,
    City: String,
    State: String,
    postalCode: Number
});

const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
