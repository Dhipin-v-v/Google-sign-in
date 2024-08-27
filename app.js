const express = require('express');
const passport = require('passport');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const homeRoutes = require('./routes/home');
const cookieParser = require('cookie-parser');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');

// Initialize Passport
require('./config/passport');
app.use(passport.initialize()); // No need for passport.session() if not using sessions

// Routes
app.use('/', homeRoutes);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
