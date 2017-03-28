const express   = require('express');
const bcrypt    = require('bcrypt');
const passport  = require('passport');
const User      = require('../models/user-model.js');

const authRoutes = express.Router();


authRoutes.get('/register', (req, res, next) => {
  // res.render('auth/register-view.ejs');
  // res.render('index');
  res.render('public/index.html');

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
  // res.render('index');
  res.render('public/index.html');

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
      // Current will have something there if user logged in succesfully.
      req.session.currentUser = user;
if (process.env.NODE_ENV === 'production') {
  res.redirect('/main');
} else {
  res.redirect('http://localhost:4200/main');
}
    } else {
      res.render('index', {
        errorMessage: 'The password is incorrect'
      });
      return;
    }
  });
});

authRoutes.get('/loggedin', (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
    return;
    console.log(currentUser);
  }
  res.status(401).json({ message: 'Unauthorized.' });
});

// authRoutes.post('/login', (req,res,next)=>{
//   const passportFunction = passport.authenticate('local', (err,theUser, failureDetails) => {
//
//     if(err) return res.render('/index',{
//       errorLogin: 'Something went wrong',
//       errorSignup: '',
//     });
//
//     if(!theUser) return res.render('/index',{
//       errorLogin: 'Incorrect username or password',
//       errorSignup: '',
//     });
//
//     req.login(theUser, (err)=>{ //LOGIN
//         if(err) return res.render('/index',{
//           errorLogin: 'Something went wrong',
//           errorSignup: '',
//         });
//
//         // res.redirect('/public/index.html');
//         if (process.env.NODE_ENV === 'production') {
//           res.redirect('/main');
//         } else {
//           res.redirect('http://localhost:4200/main');
//         }
//     });
//
//   });
//
//   passportFunction(req,res,next);//call f right after we defined it
// });


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
