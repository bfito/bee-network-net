const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI);
mongoose.connect('mongodb://localhost/bee-network-net');


const User = require('../models/user-model.js');


const users = [
  {
    userName: 'farmer',
    password: 123,
    name: 'Farmer John',
    address: {
      street: '123',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33103',
    },
    userRole: {
      farm: true,
      beekeeper: false
    },
    owndsHiveFarm: 3000
  }
];

  // db.transactions.insertMany([...])
  //                  |
  //      -------------
  //      |
// Transaction.create(transactions, (err, docs) => {
//   if (err) {
//     throw err;
//   }
//
//   docs.forEach((oneTransaction) => {
//     console.log(`${oneTransaction.name} ${oneTransaction._id}`);
//   });

User.create(users, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((oneUser) => {
    console.log(`${oneUser.name} ${oneUser._id}`);
  });

  mongoose.disconnect();
});
