var express = require('express');
var app = express();
var db = require('./db');

// AGREGAR ESTAS DOS LÍNEAS
var UserController = require('./user/UserController');
app.use('/users',UserController);

module.exports = app;

