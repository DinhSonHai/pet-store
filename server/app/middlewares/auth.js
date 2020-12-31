const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  //Lấy token từ header
  const token = req.header('x-auth-token');

  //Kiểm tra có tồn tại token trong header không
  if (!token) {
    return res.status(401).json({
      errors: [{ msg: 'Bạn cần đăng nhập để thực hiện thao tác này!' }],
    });
  }

  //Xác thực token
  try {
    const decoded = jwt.verify(token, config.get('jwtSignInSecret'));
    const { role } = decoded.user;
    if (!role || role !== 2) {
      return res.status(401).json({
        errors: [{ msg: 'Bạn không có quyền thực hiện thao tác này!' }],
      });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({ errors: [{ msg: 'Token không hợp lệ!' }] });
  }
};
