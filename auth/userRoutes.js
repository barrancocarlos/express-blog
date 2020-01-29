var passport = require('passport');
var jwt = require('jsonwebtoken');

module.exports = function (app) {
  app.post('/signup', passport.authenticate('local-signup', {
    session: false
  }), async (req, res) => {
    res.json({
      message: 'Signup successful',
      user: req.user
    });
  });

  app.post('/login', async (req, res, next) => {
    passport.authenticate('local-login', async (err, user) => {
      try {
        if (err || !user) {
          return res.status(401).json({
            message: 'Invalid User or Password'
          });
        }
        req.login(user, {
          session: false
        }, async (error) => {
          if (error) return next(error);
          const body = {
            _id: user._id,
            email: user.email
          };
          // Sign the JWT token and populate the payload with the user email and id
          const token = jwt.sign({
            user: body
          }, 'top_secret');
          // Send back the token to the user
          return res.json({
            token
          });
        });
      }
      catch (error) {
        return next(error);
      }
    })(req, res, next);
  });
};

