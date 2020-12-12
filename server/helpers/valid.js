const { check } = require('express-validator');

//Sign up
module.exports.validateSignUp = [
  check('name', 'Vui lòng nhập họ tên')
    .notEmpty()
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage('Độ dài của tên phải nằm trong khoảng từ 2 đến 32 ký tự'),
  check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
  check('password', 'Vui lòng nhập mật khẩu')
    .notEmpty()
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage('Độ dài của mật khẩu phải nằm trong khoảng từ 6 đến 32 ký tự')
    .matches(/\d/)
    .withMessage('Mật khẩu phải bao gồm số'),
  check('phoneNumber', 'Vui lòng nhập số điện thoại hợp lệ')
    .isNumeric()
    .notEmpty()
    .isLength({
      min: 10,
      max: 10,
    })
    .withMessage('Số điện thoại không hợp lệ'),
];

//Sign in
module.exports.validateSignIn = [
  check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
  check('password', 'Vui lòng nhập mật khẩu').notEmpty(),
];

//Forget password
module.exports.validateForgotPassword = [
  check('email', 'Vui lòng nhập email hợp lệ').isEmail(),
];

//Reset password
module.exports.validateResetPassword = [
  check('password', 'Vui lòng nhập mật khẩu')
    .notEmpty()
    .isLength({
      min: 6,
      max: 32,
    })
    .withMessage('Độ dài của mật khẩu phải nằm trong khoảng từ 6 đến 32 ký tự')
    .matches(/\d/)
    .withMessage('Mật khẩu phải bao gồm số'),
  check('resetPasswordLink', 'Thiếu thông tin, lỗi server').notEmpty(),
];

//Create Product
module.exports.validateCreateProductInfo = [
  check('productName', 'Vui lòng nhập tên sản phẩm').notEmpty(),
  check('price', 'Vui lòng nhập giá sản phẩm')
    .notEmpty()
    .isNumeric()
    .withMessage('Gía tiền không hợp lệ'),
  check('quantity', 'Vui lòng nhập số lượng sản phẩm')
    .notEmpty()
    .isNumeric()
    .withMessage('Số lượng không hợp lệ'),
];

//Update Product
module.exports.validateUpdateProductInfo = [
  check('productName', 'Vui lòng nhập tên sản phẩm').notEmpty(),
  check('price', 'Vui lòng nhập giá sản phẩm')
    .notEmpty()
    .isNumeric()
    .withMessage('Gía tiền không hợp lệ'),
  check('quantity', 'Vui lòng nhập số lượng sản phẩm')
    .notEmpty()
    .isNumeric()
    .withMessage('Số lượng không hợp lệ'),
];

// Update user
module.exports.validateUpdateUser = [
  check('name', 'Vui lòng nhập họ tên')
    .notEmpty()
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage('Độ dài của tên phải nằm trong khoảng từ 2 đến 32 ký tự'),
  check('phone', 'Vui lòng nhập số điện thoại hợp lệ')
    .isNumeric()
    .notEmpty()
    .isLength({
      min: 10,
      max: 10,
    })
    .withMessage('Số điện thoại không hợp lệ'),
];

// Update/Add address user
module.exports.validateUpdateAddress = [
  check('provinceState', 'Vui lòng chọn Tỉnh/Thành Phố hợp lệ!').notEmpty(),
  check('wardState', 'Vui lòng chọn Quận/Huyện hợp lệ!').notEmpty(),
  check('townState', 'Vui lòng chọn Phường/Xã hợp lệ!').notEmpty(),
  check('moreInfo', 'Vui lòng nhập địa chỉ!').notEmpty(),
];
