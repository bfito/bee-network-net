const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model.js');

const authRoutes = express.Router();


authRoutes.get('/register', (req, res, next) => {
  // res.render('auth/register-view.ejs');
  res.render('index');

});

authRoutes.post('/register', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === '' || password === '') {
    // res.render('auth/signup-view.ejs', {
    res.render('index', {
      errorMessage: 'Please fill out both username and password foo\'!'
    });
    return;
  }

  User.findOne(
    { username: username },
    { username: 1 },

    (err, foundUser) => {
      if (err) {
        next(err);
        return;
      }

      if (foundUser !== null) {
        res.render('index', {
          errorMessage: 'The username already exists'
        });
        return;
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const userInfo = {
        username: username,
        password: hashPass
      };

      const theUser = new User(userInfo);

      theUser.save((err) => {
        if (err) {
          res.render('index', {
            errorMessage: 'Oops! There was a problem. Try again later.'
          });
          return;
        }

        res.redirect('/');
      });
    });
});


authRoutes.get('/login', (req, res, next) => {
  res.render('index');
});

authRoutes.post('/login', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === '' || password === '') {
    res.render('index', {
      errorMessage: 'Indicate a username and password to log in.'
    });
    return;
  }

  User.findOne({ username: username }, (err, user) => {
    if (err) {
      next(err);
      return;
    }

    if (!user) {
      res.render('index', {
        errorMessage: 'The username doesn\'t exist'
      });
      return;
    }

    // This is the more important part of the code to verify password..
    if (bcrypt.compareSync(password, user.password)) {
      // Current will have sometingin there if user logged in succesfully.
      req.session.currentUser = user;
      res.redirect('/');
    } else {
      res.render('index', {
        errorMessage: 'The password is incorrect'
      });
      return;
    }
  });
});

authRoutes.get('/logout', (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      next(err);
      return;
    }
    res.redirect('/');
  });
});

module.exports = authRoutes;
