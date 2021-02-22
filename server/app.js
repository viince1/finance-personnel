var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var objectifsRouter = require('./routes/objectifs');
var comptesRouter = require('./routes/comptes');
var depensesRouter = require('./routes/depenses');
var revenusRouter = require('./routes/revenus');
var budgetsRouter = require('./routes/budgets');
var categoriesRevenusRouter = require('./routes/categoriesrevenus')
var categoriesDepensesRouter = require('./routes/categoriesdepenses')
var investissementRouter = require('./routes/investissement')
var ordreAchatRouter = require('./routes/ordreachat')
var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/objectifs', objectifsRouter)
app.use('/comptes', comptesRouter)
app.use('/depenses', depensesRouter)
app.use('/revenus', revenusRouter)
app.use('/budgets', budgetsRouter)
app.use('/categoriesrevenus', categoriesRevenusRouter)
app.use('/categoriesdepenses', categoriesDepensesRouter)
app.use('/investissement', investissementRouter)
app.use('/ordreachat', ordreAchatRouter)

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
