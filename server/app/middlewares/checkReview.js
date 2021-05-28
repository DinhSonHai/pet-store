const jwt = require('jsonwebtoken');
const { jwtSignInSecret } = require('../../config/default.json');
const constants = require('../../constants');

module.exports = function (req, res, next) {
  req.user = null;
  const token = req.header('x-auth-token');
  if (!token) {
    return next();
  }
  try {
    jwt.verify(token, jwtSignInSecret, (err, decoded) => {
      if (err || decoded.user.role !== constants.USER) {
        return next();
      }
      req.user = decoded.user;
      next();
    });
  } catch (err) {
    next();
  }
};
