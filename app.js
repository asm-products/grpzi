var express = require('express'),
    path = require('path'),
    favicon = require('static-favicon'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    db = require('mongoose');

var app = express();

// config setup
require('./config')(app, db);

// middleware setup
app.use(bodyParser());

// log setup
app.use(logger('dev'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(require('express-ejs-layouts'));

// asset setup
app.use(express.static(path.join(__dirname, 'public')));

// favicon setup
app.use(favicon());

// controllers setup
require('./controllers/home')(app);

// error helper setup
require('./helpers/errors')(app);

module.exports = app;
