var express = require('express'),
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

// controllers setup

// error helper setup
require('./helpers/errors')(app);

module.exports = app;
