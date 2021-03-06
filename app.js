const express      = require('express');
const path         = require('path');
const favicon      = require('serve-favicon');
const logger       = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser   = require('body-parser');
const layouts      = require('express-ejs-layouts');
const mongoose     = require('mongoose');
const dotenv       = require('dotenv');
const cors         = require('cors');


//env
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
// mongoose.connect('mongodb://localhost/bee-network-net');
const app = express();

// require('./config/api');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);
//use cors
// app.use(cors());
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200', 'http://localhost:8000']
  }));
}

// //-----------------AUTH PASSPORT START
const session = require('express-session');
// const passport = require('passport');
//
app.use(session({
  secret: 'userSession',
  resave: true,
  saveUninitialized: true,
  cookie : { httpOnly: true, maxAge: 2419200000 }
}));
//
// app.use(passport.initialize());
// app.use(passport.session());
//
// //Connect and use passport config file:
// const passportSetup = require('./config/passport');
// passportSetup(passport);
//
// //-----------------AUTH PASSPORT END
const apiaryFarmsApi = require('./routes/api');
app.use('/api', apiaryFarmsApi);
const listingApi = require('./routes/api');
app.use('/api', listingApi);

// const index = require('./routes/index');
const auth = require('./routes/auth-routes');
// app.use('/', index);
app.use('/', auth);


// replaced passport ensureLoggedIn
const ensure = (req, res, next) => {
  if (!req.session.currentUser) {
    res.redirect('/login');
  }
  else {
    next();
  }
};
//ANGULAR SPA
app.use(ensure);

app.use((req,res,next)=>{
  res.sendfile(__dirname + '/public/angular.html');
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
