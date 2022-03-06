var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var morganBody = require('morgan-body');
var bodyParser = require('body-parser');

var textRouter = require('./routes/text');
var counselingRouter = require('./routes/counseling');

var app = express();

require('./logger').info("start..")

// app.use(logger(":method :url :status - :response-time ms - :res[content-length] :remote-addr :user-agent"));
app.use(bodyParser.json())
morganBody(app)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/text', textRouter);
app.use('/counseling', counselingRouter);

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
