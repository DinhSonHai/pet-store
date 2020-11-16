const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Lấy token từ header
  const token = req.header('x-auth-token');

  //Xử lý đặt hàng cho khách
  //Kiểm tra có tồn tại token trong header không nếu không nghĩa là người dùng không đăng nhập
  if (!token) {
    req.userId = null;
    console.log('Guest');
    next();
    return;
  }

  //Xử lý đặt hàng cho người dùng
  //Xác thực token
  try {
    const decoded = jwt.verify(token, config.get('jwtSignInSecret'));
    req.userId = decoded.user.id;
    console.log('User');
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token không hợp lệ' });
  }
};
