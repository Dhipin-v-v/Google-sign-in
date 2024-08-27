const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route to start Google authentication
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Route for Google callback
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) {
      return res.redirect('/login'); // Redirect to login if authentication fails
    }

    const token = user.token; // The token is created in passport.js and passed in the user object

    // Set token in cookies
    res.cookie('jwt', token, { httpOnly: true });

    // Redirect to the home page or another page
    res.redirect('/');
  })(req, res, next);
});

// Route to handle logout
router.get('/logout', (req, res) => {
  res.clearCookie('jwt');
  res.redirect('/');
});

module.exports = router;
