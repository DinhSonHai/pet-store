const express = require('express');
const router = express.Router();

const AuthController = require('../../app/controllers/AuthController');
const { validateSignUp, validateSignIn, validateForgotPassword, validateResetPassword } = require('../../helpers/valid');

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

// @route   POST api/auth/forgetpassword
// @desc    Forget password
// @access  Public
router.post('/forgotpassword', validateForgotPassword, AuthController.forgotPassword);

// @route   POST api/auth/resetpassword
// @desc    Reset password
// @access  Public
router.post('/resetpassword', validateResetPassword, AuthController.resetPassword);

module.exports = router;
