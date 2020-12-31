const express = require('express');
const router = express.Router();

const AuthController = require('../../app/controllers/AuthController');

const auth = require('../../app/middlewares/auth');
const checkPermission = require('../../app/middlewares/checkPermission');

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

// @route   POST api/auth/_signup
// @desc    Sign up for Employee
// @access  Private
router.post(
  '/_signup',
  [checkPermission, validateSignUp],
  AuthController._signUp
);

// @route   POST api/auth/_signup_admin
// @desc    Sign up for Admin
// @access  Private
router.post('/_signup_admin', AuthController._signUp_admin);

// @route   POST api/auth/activate
// @desc    Activate an account
// @access  Public
router.post('/activate', AuthController.activate);

// @route   POST api/auth/signin
// @desc    Sign in
// @access  Public
router.post('/signin', validateSignIn, AuthController.signIn);

// @route   POST api/auth/_signin
// @desc    Sign in for admin/employee
// @access  Public
router.post('/_signin', validateSignIn, AuthController._signIn);

// @route   POST api/auth/googlelogin
// @desc    Sign in with google account
// @access  Public
router.post('/googlelogin', AuthController.googleLogin);

// @route   POST api/auth/facebooklogin
// @desc    Sign in with facebok account
// @access  Public
router.post('/facebooklogin', AuthController.facebookLogin);

// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, AuthController.getUserData);

// @route   GET api/auth/_user
// @desc    Get admin, employee data
// @access  Private
router.get('/_user', checkPermission, AuthController.get_UserData);

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
// @desc    Update user
// @access  Private
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

// @route   PUT api/auth/favorite
// @desc    Add favorite product
// @access  Private
router.put('/favorite', auth, AuthController.favoriteProduct);

// @route   GET api/auth/favorite
// @desc    Get favorite product
// @access  Private
router.get('/favorite', auth, AuthController.getFavoriteProducts);

module.exports = router;
