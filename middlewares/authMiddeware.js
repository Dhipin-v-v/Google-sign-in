const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.cookies.jwt;
  if (!token) return next(); // If no token, continue to the route (user is not authenticated)
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(); // If token is invalid, continue to route (user is not authenticated)
    req.user = decoded; // Add user info to request
    next();
  });
}

module.exports = authMiddleware;