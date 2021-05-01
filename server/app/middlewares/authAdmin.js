const jwt = require('jsonwebtoken');
const { jwtSignInSecretAdmin } = require('../../config/default.json');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').user;

module.exports = function (req, res, next) {
  //Lấy token từ header
  const token = req.header('x-auth-token');
  //Kiểm tra có tồn tại token trong header không
  if (!token) {
    return res.status(statusCode.unauthorized).json({
      errors: [{ msg: message.noToken }],
    });
  }
  //Xác thực token
  try {
    const decoded = jwt.verify(token, jwtSignInSecretAdmin);
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(statusCode.unauthorized).json({
      errors: [{ msg: message.invalidToken }],
    });
  }
};
