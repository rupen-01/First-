const jwt = require('jsonwebtoken');
var express = require('express');
var router = express.Router();


// Middleware to verify token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).send('Token is required for authentication');
    }
  
    jwt.verify(token, 'your_secret_key', (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      req.userId = decoded.userId;
      next();
    });
  }

  module.exports = { verifyToken };