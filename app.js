var createError = require('http-errors');
var express = require('express');
const hbs = require('express-handlebars');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db/database');
const bodyParser = require('body-parser');
const session = require('express-session');

var advisorRouter = require('./routes/advisor');
var adminRouter = require('./routes/admin');
var facultyRouter = require('./routes/faculty');
var homeRouter = require('./routes/home');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', hbs.engine({
  extname: 'hbs',
  defaultLayout: 'layout',
  layoutsDir: __dirname + '/views/layouts/',
  partialsDir: __dirname + '/views/partials/'
}));

// Set Handlebars as the default view engine
app.set('view engine', 'hbs');
// Use body-parser middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Your other middleware and routes go here
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({secret:"Key",cookie:{maxAge:60000}}))

// Apply verifyLogin middleware to protected routes
app.use('/admin', adminRouter);
app.use('/advisor', advisorRouter);
app.use('/faculty', facultyRouter);
app.use('/', homeRouter.router);
app.use(homeRouter.verifyLogin); // Applying verifyLogin middleware globally

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
