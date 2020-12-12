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
// @desc    Sign up an account
// @access  Public
router.post('/signup', validateSignUp, AuthController.signUp);

// @route   POST api/auth/activate
// @desc    Activate an account
// @access  Public
router.post('/activate', AuthController.activate);

// @route   POST api/auth/signin
// @desc    Sign in
// @access  Public
router.post('/signin', validateSignIn, AuthController.signIn);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, AuthController.getUserData);

// @route   PUT api/auth/forgetpassword
// @desc    Forget password
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
// @desc    Reset password
// @access  Public
router.put(
  '/update_user',
  [auth, validateUpdateUser],
  AuthController.updateUserInfo
);

// @route   PUT api/auth/add_address
// @desc    Add user address
// @access  Private
router.put(
  '/add_address',
  [auth, validateUpdateAddress],
  AuthController.AddUserAddress
);

// @route   PUT api/auth/remove_address
// @desc    Remove user address
// @access  Private
router.put('/remove_address', auth, AuthController.RemoveUserAddress);

// @route   PUT api/auth/update_address
// @desc    Update user address
// @access  Private
router.put(
  '/update_address',
  [auth, validateUpdateAddress],
  AuthController.UpdateUserAddress
);

module.exports = router;
