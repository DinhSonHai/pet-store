const express = require('express');
const router = express.Router();

const AuthController = require('../../app/controllers/AuthController');

const auth = require('../../app/middlewares/auth');

const {
  validateSignUp,
  validateSignIn,
  validateForgotPassword,
  validateResetPassword,
  validateUpdateUser,
  validateUpdateAddress,
} = require('../../helpers/valid');

// @route   POST api/auth/signup
// @desc    Đăng ký tài khoản
// @access  Public
router.post('/signup', validateSignUp, AuthController.signUp);

// @route   POST api/auth/activate
// @desc    Kích hoạt tài khoản
// @access  Public
router.post('/activate', AuthController.activate);

// @route   POST api/auth/signin
// @desc    Đăng nhập
// @access  Public
router.post('/signin', validateSignIn, AuthController.signIn);

// @route   POST api/auth/googlelogin
// @desc    Đăng nhập bằng google
// @access  Public
router.post('/googlelogin', AuthController.googleLogin);

// @route   POST api/auth/facebooklogin
// @desc    Đăng nhập bằng facebook
// @access  Public
router.post('/facebooklogin', AuthController.facebookLogin);

// @route   GET api/auth/user
// @desc    Lấy thông tin người dùng
// @access  Private
router.get('/user', auth, AuthController.getUserData);

// @route   PUT api/auth/forgetpassword
// @desc    Yêu cầu reset password
// @access  Public
router.put(
  '/forgotpassword',
  validateForgotPassword,
  AuthController.forgotPassword
);

// @route   PUT api/auth/resetpassword
// @desc    Reset password
// @access  Public
router.put(
  '/resetpassword',
  validateResetPassword,
  AuthController.resetPassword
);

// @route   PUT api/auth/update_user
// @desc    Cập nhật thông tin người dùng
// @access  Private
router.put(
  '/update_user',
  [auth, validateUpdateUser],
  AuthController.updateUserInfo
);

// @route   PUT api/auth/add_address
// @desc    Thêm địa chỉ người dùng
// @access  Private
router.put(
  '/add_address',
  [auth, validateUpdateAddress],
  AuthController.AddUserAddress
);

// @route   PUT api/auth/remove_address
// @desc    Xóa địa chỉ người dùng
// @access  Private
router.put('/remove_address', auth, AuthController.RemoveUserAddress);

// @route   PUT api/auth/update_address
// @desc    Cập nhật địa chỉ người dùng
// @access  Private
router.put(
  '/update_address',
  [auth, validateUpdateAddress],
  AuthController.UpdateUserAddress
);

// @route   PUT api/auth/favorite
// @desc    Thêm/Bỏ sản phẩm ưa thích
// @access  Private
router.put('/favorite', auth, AuthController.favoriteProduct);

// @route   GET api/auth/favorite
// @desc    Lấy sản phẩm ưa thích
// @access  Private
router.get('/favorite', auth, AuthController.getFavoriteProducts);

// @route   GET api/auth/purchased
// @desc    Lấy sản phẩm đã mua
// @access  Private
router.get('/purchased', auth, AuthController.getPurchasedProducts);

module.exports = router;
