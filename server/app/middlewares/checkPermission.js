const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const { role } = req.user;
  if (role !== 0) {
    return res.status(401).json({
      errors: [{ msg: 'Từ chối thao tác, bạn không có quyền!' }],
    });
  }
  next();
};
