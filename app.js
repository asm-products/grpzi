var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    db = require('mongoose');

var app = express();

// config setup
require('./config')(app, db);

// load helpers
require('./helpers/params')(app);

// middleware setup
app.use(bodyParser());

// log setup
app.use(logger('dev'));

// controllers setup
require('./controllers/user')(app, db);

// error helper setup
require('./helpers/errors')(app);

module.exports = app;
