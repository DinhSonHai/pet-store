module.exports = function (role) {
  let check = role === 0 ? true : false;
  if (!check) {
    return res.status(401).json({
      errors: [{ msg: 'Từ chối thao tác, bạn không có quyền!' }],
    });
  }
};
