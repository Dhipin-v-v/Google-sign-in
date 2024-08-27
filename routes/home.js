const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const authMiddleware = require('../middlewares/authMiddeware')

router.get('/',authMiddleware, (req, res) => {
  console.log("Cookie:",req.cookies);
  res.render('home', { user: req.user });
});

router.get('/login',(req, res) => {
  res.render('login');
});

module.exports = router;
