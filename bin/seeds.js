const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const User = require('../models/user.js');


const users = [
  {
    userName: 'farmer',
    password: 123,
    name: farmer,
      address: {
      street: '123',
      city: 'Miami',
      state: 'Florida',
      zipcode: '33103',
    }
  }
];

  // db.products.insertMany([...])
  //                  |
  //      -------------
  //      |
Product.create(products, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((oneProduct) => {
    console.log(`${oneProduct.name} ${oneProduct._id}`);
  });

  mongoose.disconnect();
});
