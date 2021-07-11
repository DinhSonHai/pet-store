const express = require('express');
const router = express.Router();
const EmployeeController = require('../../app/controllers/EmployeeController');
const authAdmin = require('../../app/middlewares/authAdmin');
const checkPermission = require('../../app/middlewares/checkPermission');
const { validateSignUp, validateSignIn, validateForgotPassword, validateResetPassword} = require('../../helpers/valid');

// @route   GET api/employee/user
// @desc    Lấy thông tin nhân viên/admin
// @access  Private
router.get('/user', authAdmin, EmployeeController.getUserData);

// @route   POST api/employee/signup
// @desc    Đăng ký tài khoản nhân viên
// @access  Private
router.post(
  '/signup',
  [authAdmin, checkPermission, validateSignUp],
  EmployeeController.signUp
);

// @route   POST api/employee/signup_admin
// @desc    Đăng ký tài khoản admin(yêu cầu khóa bí mật)
// @access  Private
router.post('/signup_admin', EmployeeController.signUp_admin);

// @route   POST api/employee/signin
// @desc    Đăng nhập tài khoản admin/nhân viên
// @access  Public
router.post('/signin', validateSignIn, EmployeeController.signIn);

// @route   PUT api/employee/forgetpassword
// @desc    Yêu cầu reset password
// @access  Public
router.put(
  '/forgotpassword',
  validateForgotPassword,
  EmployeeController.forgotPassword
);

// @route   PUT api/employee/resetpassword
// @desc    Reset password
// @access  Public
router.put(
  '/resetpassword',
  validateResetPassword,
  EmployeeController.resetPassword
);
module.exports = router;
