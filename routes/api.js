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

    res.json({
      message: 'New ApiaryFarm created!',
      id: theApiaryFarm._id
    });
  });
});

module.exports = router;
