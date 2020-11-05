const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');
const Employee = require('../models/Employee');
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

    let user = decoded.user;

    const checkAccountExists = async () => { 
      const check = await Employee.exists({ _id: user._id }) || await Admin.exists({ _id: user._id });  
      console.log(check)
  
      if(!check) {
        return res.status(401).json({ msg: 'Từ chối thao tác, bạn không có quyền truy cập' });
      }
  
      req.user = user;
      
      next();
    }

    checkAccountExists();
  } catch (err) {
    return res.status(401).json({ msg: 'Token không hợp lệ' });
  }
};
