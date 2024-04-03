var express = require('express');
var router = express.Router();
const { verifyToken } = require('../meddilware/mid');

// Protected route example
router.get('/protected', verifyToken, (req, res) => {
  res.send('Protected route, token verified');
});

// Error handler for token verification failure
router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send('Unauthorized');
  } else {
    next(err);
  }
});

module.exports = router;
