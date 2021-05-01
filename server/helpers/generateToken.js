const jwt = require('jsonwebtoken');
const generateToken = (payload, secret, time) => {
  const token = jwt.sign(payload, secret, { expiresIn: time });
  return token;
};
module.exports = generateToken;
