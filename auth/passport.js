var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

var User = require('../models/usersModel.js');

module.exports = function () {
  // used to serialize the user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // Local Singup/Register
  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  ((req, email, password, done) => {
    process.nextTick(() => {
      User.findOne({
        'local.email': email
      }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, false, {
            message: 'User exists'
          });
        }
        var newUser = new User();
        // set the user's local credentials
        newUser.local.email = email;
        newUser.local.password = newUser.generateHash(password);
        // save the user
        newUser.save((err) => {
          if (err) {
            throw err;
          }
          return done(null, newUser, {
            message: 'User created'
          });
        });
      });
    });
  })));

  // Local Login
  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
  },
  ((req, email, password, done) => {
    User.findOne({
      'local.email': email
    }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {
          message: 'No user found'
        });
      }
      if (!user.validPassword(password)) {
        return done(null, false, {
          message: 'Wrong Password'
        });
      }
      // return successful user
      return done(null, user);
    });
  })));

  // JsonWebToken
  passport.use(new JWTstrategy({
    // secret to sign JWT
    secretOrKey: 'top_secret',
    // user send the token in header with the name 'secret_token'
    jwtFromRequest: ExtractJWT.fromHeader('secret_token')
  }, async (token, done) => {
    try {
      // Pass the user details to the next middleware
      return done(null, token.user);
    }
    catch (error) {
      done(error);
    }
  }));
};
