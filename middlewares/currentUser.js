const jwt = require('jsonwebtoken');
const config = require('../config');

module.exports = function (req, res, next) {
  if (!req.session) {
    return next();
  }

  if (!req.session.jwt) {
    return next();
  }

  try {
    const payload = jwt.verify(req.session.jwt, config.JWT_SECRET);

    req.currentUser = payload;
  } catch (error) {
    console.log('jwt verify failed :<');
  }

  next();
};
