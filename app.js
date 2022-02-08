var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');

var morganBody = require('morgan-body');
var bodyParser = require('body-parser');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user');
var deviceRouter = require('./routes/device');
var msgRouter = require('./routes/msg');
var viewerRouter = require('./routes/viewer');
var alarmRouter = require('./routes/alarm');
var airkrRouter = require('./routes/airkr');
var textRouter = require('./routes/text');
var groupRouter = require('./routes/group');
var memberRouter = require('./routes/groupMember');
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

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/device', deviceRouter);
app.use('/msg', msgRouter);
app.use('/viewer', viewerRouter);
app.use('/alarm', alarmRouter);
app.use('/airkr', airkrRouter);
app.use('/text', textRouter);
app.use('/group', groupRouter);
app.use('/group/member', memberRouter);
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
