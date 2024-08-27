const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback'
},
(accessToken, refreshToken, profile, done) => {
  // Create a JWT token and attach it to the user object
  const token = jwt.sign({ id: profile.id, email: profile.emails[0].value }, process.env.JWT_SECRET, { expiresIn: '1h' });
  return done(null, { token }); // Pass the token in the user object
}));
