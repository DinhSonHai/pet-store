const express = require('express');
const router = express.Router();

const AuthController = require('../../app/controllers/AuthController');
<<<<<<< HEAD
const {
  validateSignUp,
  validateSignIn,
  validateForgetPassword,
  validateResetPassword,
} = require('../../helpers/valid');
const auth = require('../../app/middlewares/auth');
=======
const { validateSignUp, validateSignIn, validateForgotPassword, validateResetPassword } = require('../../helpers/valid');
>>>>>>> features/products-api

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

<<<<<<< HEAD
// @route   GET api/auth/user
// @desc    Get user data
// @access  Private
router.get('/user', auth, AuthController.getUserData);
=======
// @route   POST api/auth/forgetpassword
// @desc    Forget password
// @access  Public
router.post('/forgotpassword', validateForgotPassword, AuthController.forgotPassword);

// @route   POST api/auth/resetpassword
// @desc    Reset password
// @access  Public
router.post('/resetpassword', validateResetPassword, AuthController.resetPassword);
>>>>>>> features/products-api

module.exports = router;
