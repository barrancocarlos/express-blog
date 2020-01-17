var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// custom =================
var cors = require('cors');

// custom =================
var postRouter = require('./routes/postRoutes');
var authorRouter = require('./routes/authorRoutes');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// custom =================
app.use('/posts', postRouter);
app.use('/authors', authorRouter);

// Db connect custom =================
require('./config/database');

module.exports = app;
