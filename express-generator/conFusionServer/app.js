//  import modules for logging
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');

//  import modules
const mongoose = require('mongoose');
var passport = require('passport');

//  import local modules
var config = require('./config');
var authenticate = require('./authenticate');

//  connect to mongoDB server
const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Successfully connected to conFusion mongoDB server.');
}).catch(err => console.log(err));

//  import default routers
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//  import custom routers
const dishRouter = require('./routes/dishRouter');
const promoRouter = require('./routes/promoRouter');
const leaderRouter = require('./routes/leaderRouter');
const uploadRouter = require('./routes/uploadRouter');

var app = express();

// Secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  }
  else {
    res.redirect(307, 'https://' + req.hostname + ':' + app.get('secPort') + req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//  use middle-wear
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);
app.use('/imageUpload',uploadRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
