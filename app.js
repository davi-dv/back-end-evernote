var express = require('express');
var path = require('path');
var logger = require('morgan');
let cors = require('cors')

var usersRouter = require('./app/routes/users');
var noteRouter = require('./app/routes/notes')


var app = express();
require('./config/database')

//midlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors)

app.use('/users',usersRouter)
app.use('/notes',noteRouter)

module.exports = app;
