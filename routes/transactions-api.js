const express = require('express');
const mongoose = require('mongoose');

const Transaction = require('../models/transaction-model');

const router = express.Router();

router.get('/transactions', (req, res, next) => {
  Transaction.find((err, transactionsList) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(transactionsList);
  });
});


router.post('/transactions', (req, res, next) => {
  const theTransaction = new Transaction({
    // dateStart: req.body.dateStart,
    // dateEnd: req.body.dateEnd,
    message: req.body.message,
    beekeeperID: req.params.beekeeperID,
    farmID: req.params.farmID
  });

    theTransaction.save((err) => {
      if (err) {
        res.json(err);
        return;
      }

      res.json({
        message: 'new Transaction created!',
        id: theTransaction.id
      });
    });
});

router.get('/transactions/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: 'Specified id is not valid' });
    return;
  }

  Transaction.findById(req.params.id, (err, theTransaction) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json(theTransaction);
  });
});

router.put('/transactions/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
      .json({ message: 'Specified id is not valid' });
      return;
  }

  const updates = {
    // dateStart: req.body.dateStart,
    // dateEnd: req.body.dateEnd,
    message: req.body.message
  };

  Transaction.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }
    res.json({
      message: "Transaction updated!"
    });
  });
});

router.delete('/transactions/:id', (req, res, next) => {
  if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
    .json({ message: 'Specified id is not valid!' });
    return;
  }

  Transaction.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Transaction has been removed!'
    });
  });
});

module.exports = router;
