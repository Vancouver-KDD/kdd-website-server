var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes');
var eventsRouter = require('./routes/events');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/sponser', function(req, res){
  res.redirect('https://foodly.ca/');
});

app.use('/', indexRouter);
app.use('/events', eventsRouter);

module.exports = app;
