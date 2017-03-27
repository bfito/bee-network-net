const express = require('express');
const mongoose = require('mongoose');
const ApiaryFarm = require('../models/apiary-farm-model');

var router = express.Router();


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
router.get('/phones/:id', (req, res) => {
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
