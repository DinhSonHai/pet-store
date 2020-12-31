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
    const decoded = jwt.verify(token, config.get('jwtSignInSecretAdmin'));
    const { role } = decoded.user;

    if (role !== 0) {
      return res.status(401).json({
        errors: [{ msg: 'Từ chối thao tác, bạn không có quyền!' }],
      });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    return res.status(401).json({
      errors: [{ msg: 'Token không hợp lệ!' }],
    });
  }
};
