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
  check('email', 'Vui lòng nhập email')
    .notEmpty()
    .isEmail()
    .withMessage('Vui lòng nhập email hợp lệ'),
  check('password', 'Mật khẩu phải có ít nhất 8 ký tự, 1 ký tự in hoa, 1 ký tự thường và 1 ký tự đặc biệt')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, ""),
  check('phoneNumber', 'Vui lòng nhập số điện thoại hợp lệ')
    .isNumeric()
    .notEmpty()
    .isLength({
      min: 10,
      max: 10,
    })
    .withMessage('Số điện thoại không hợp lệ'),
  check('gender', 'Vui lòng chọn giới tính')
    .notEmpty()
    .isNumeric()
    .withMessage('Giới tính không hợp lệ'),
];

//Sign in
module.exports.validateSignIn = [
  check('email', 'Vui lòng nhập email')
    .notEmpty()
    .isEmail()
    .withMessage('Vui lòng nhập email hợp lệ'),
  check('password', 'Vui lòng nhập mật khẩu').notEmpty(),
];

//Forget password
module.exports.validateForgotPassword = [
  check('email', 'Vui lòng nhập email')
    .notEmpty()
    .isEmail()
    .withMessage('Vui lòng nhập email hợp lệ'),
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
  check('resetPasswordLink', 'Link reset không hợp lệ!').notEmpty(),
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
  check('phone', 'Vui lòng nhập số điện thoại')
    .notEmpty()
    .isNumeric()
    .withMessage('Số điện thoại không hợp lệ')
    .isLength({
      min: 10,
      max: 10,
    })
    .withMessage('Số điện thoại tối thiểu và tối đa 10 chữ số'),
];

// Update/Add address user
module.exports.validateUpdateAddress = [
  check('provinceState', 'Vui lòng chọn Tỉnh/Thành Phố hợp lệ!').notEmpty(),
  check('wardState', 'Vui lòng chọn Quận/Huyện hợp lệ!').notEmpty(),
  check('townState', 'Vui lòng chọn Phường/Xã hợp lệ!').notEmpty(),
  check('moreInfo', 'Vui lòng nhập địa chỉ!').notEmpty(),
];

// Order
module.exports.validateOrder = [
  check('name', 'Vui lòng nhập họ tên')
    .notEmpty()
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage('Độ dài của tên phải nằm trong khoảng từ 2 đến 32 ký tự'),
  check('email', 'Vui lòng nhập email')
    .notEmpty()
    .isEmail()
    .withMessage('Vui lòng nhập email hợp lệ'),
  check('phone', 'Vui lòng nhập số điện thoại')
    .notEmpty()
    .isNumeric()
    .withMessage('Số điện thoại không hợp lệ')
    .isLength({
      min: 10,
      max: 10,
    })
    .withMessage('Số điện thoại tối thiểu và tối đa 10 chữ số'),
  check('deliveryState', 'Vui lòng chọn phương thức vận chuyển')
    .notEmpty()
    .isNumeric()
    .withMessage('Phương thức vận chuyển không hợp lệ'),
  check('paymentState', 'Vui lòng chọn phương thức thanh toán')
    .notEmpty()
    .isNumeric()
    .withMessage('Phương thức thanh toán không hợp lệ'),
];

// Order when login
module.exports.validateOrderAuth = [
  check('address', 'Vui lòng chọn địa chỉ hợp lệ').notEmpty(),
  check('deliveryState', 'Vui lòng chọn phương thức vận chuyển')
    .notEmpty()
    .isNumeric()
    .withMessage('Phương thức vận chuyển không hợp lệ'),
  check('paymentState', 'Vui lòng chọn phương thức thanh toán')
    .notEmpty()
    .isNumeric()
    .withMessage('Phương thức thanh toán không hợp lệ'),
];

// Order when process at admin
module.exports.validateOrderAdmin = [
  check('address', 'Vui lòng nhập địa chỉ').notEmpty(),
  check('name', 'Vui lòng nhập họ tên')
    .notEmpty()
    .isLength({
      min: 2,
      max: 32,
    })
    .withMessage('Độ dài của tên phải nằm trong khoảng từ 2 đến 32 ký tự'),
  check('phone', 'Vui lòng nhập số điện thoại')
    .notEmpty()
    .isNumeric()
    .withMessage('Số điện thoại không hợp lệ')
    .isLength({
      min: 10,
      max: 10,
    })
    .withMessage('Số điện thoại tối thiểu và tối đa 10 chữ số'),
];

// Valid review content
module.exports.validateReview = [
  check('starRatings', 'Vui lòng đánh giá sản phẩm')
    .notEmpty()
    .isFloat({ min: 0, max: 5 })
    .withMessage('Số đánh giá phải nằm trong khoảng từ 0 đến 5'),
  check('comment', 'Vui lòng nhập bình luận')
    .notEmpty()
    .isLength({
      min: 2,
      max: 1000,
    })
    .withMessage('Đáng giá tối thiểu 2 kí tự và tối ta 1000 kí tự'),
];

// Valid comment on review content
module.exports.validateComment = [
  check('replyComment', 'Vui lòng nhập bình luận')
    .notEmpty()
    .isLength({
      min: 2,
      max: 1000,
    })
    .withMessage('Đáng giá tối thiểu 2 kí tự và tối ta 1000 kí tự'),
];

// Valid comment on review content
module.exports.validateCommentAdmin = [
  check('replyComment', 'Vui lòng nhập bình luận').notEmpty(),
];
