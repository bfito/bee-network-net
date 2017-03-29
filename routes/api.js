const express = require('express');
const mongoose = require('mongoose');
const ApiaryFarm = require('../models/apiary-farm-model');
const User       = require('../models/user-model');
const Listing    = require('../models/listing-model');

var router = express.Router();

router.get('/user', (req, res) => {
  User.find((err, users) => {
    if (err) {
      res.json(err);
      return;
    }
  res.json(users);
  });
});

/* GET ApiaryFarms listing. */
router.get('/apiaryFarms', (req, res, next) => {
  ApiaryFarm.find((err, apiaryFarmList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(apiaryFarmList);
  });
});

/* CREATE a new ApiaryFarm. */
router.post('/apiaryFarms', (req, res, next) => {
  const theApiaryFarm = new ApiaryFarm({
    name: req.body.name,
    state: req.body.state,
  });

  theApiaryFarm.save((err) => {
    if (err) {
      res.json(err);
      return;
    }
console.log('Inside router por apiaryFarms.save');
    res.json({
      message: 'New ApiaryFarm created!',
      id: theApiaryFarm._id
    });
  });
});

router.post('/listing', (req, res, next) => {
  const theListing = new Listing({
    // Author: req.users._id,
    Address: req.body.Address,
    City: req.body.City,
    State: req.body.State,
    postalCode: req.body.postalCode,
  });
  theListing.save((err) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json('Created listing!');
  // id: req.user._id
    //
    // console.log('Created listing!');
    // console.log(req.user._id);
  });
});

/* GET listing. */
router.get('/listing', (req, res, next) => {
  Listing.find((err, listing) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(listing);
  });
});

router.put('/apiaryFarms/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: 'Specified id is not valid' });
      return;
  }

  const updates = {
    name: req.body.name,
    state: req.body.state,
  };

  ApiaryFarm.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({
      message: "Updated!"
    });
  });
});

/* GET a single User. */
router.get('/user/:id', (req, res) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: 'Specified id is not valid' });
    return;
  }

  User.findById(req.params.id, (err, theUser) => {
      if (err) {
        res.json(err);
        return;
      }
      res.json(theUser);
    });
});

module.exports = router;
