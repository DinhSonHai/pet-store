const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Lấy token từ header
  const token = req.header('x-auth-token');

  //Kiểm tra có tồn tại token trong header không
  if (!token) {
    return res.status(401).json({ msg: 'Không có token, từ chối thao tác' });
  }

  //Xác thực token
  try {
    const decoded = jwt.verify(token, config.get('jwtSignInSecret'));

    req.user = decoded.user;
    
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token không hợp lệ' });
  }
};
