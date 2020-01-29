var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// packages custom =================
var cors = require('cors');
var session = require('express-session');
var passport = require('passport');

// routes custom =================
var postRouter = require('./routes/postRoutes');
var authorRouter = require('./routes/authorRoutes');

var app = express();

// passport custom =================
require('./config/passport')(passport);
app.use(session({ secret: 'ilovenodejs' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router custom =================
app.use('/posts', postRouter);
app.use('/authors', authorRouter);

// Db connect custom =================
require('./config/database');

module.exports = app;
