const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/bee-network-net');


// const User = require('../models/user-model.js');
//
//
// const users = [
//   {
//     userName: 'farmer',
//     password: 123,
//     name: 'Farmer John',
//     address: {
//       street: '123',
//       city: 'Miami',
//       state: 'Florida',
//       zipcode: '33103',
//     },
//     userRole: {
//       farm: true,
//       beekeeper: false
//     },
//     owndsHiveFarm: 3000
//   }
// ];
//
//
// User.create(users, (err, docs) => {
//   if (err) {
//     throw err;
//   }


  // docs.forEach((oneUser) => {
  //   console.log(`${oneUser.name} ${oneUser._id}`);
  // });
  const Listing = require('../models/listing-model.js');

  // const Listing = mongoose.model('Listing', listingSchema);

  const listing = [
    {
    // listingNumber: '',
    FarmApiary: 'Anarchy Apiary',
    StartDate: '12/12/2016',
    EndDate: '01/12/2017',
    Email: 'jpizzle@abeille.com',
    Address: '123 NE 1St St',
    City: 'Miami',
    State: 'FL',
    postalCode: '33130'
  }
];

Listing.create(listing, (err, docs) => {
  if (err) {
    throw err;
  }

  mongoose.disconnect();
});
