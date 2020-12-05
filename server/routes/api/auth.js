const express = require('express');
const router = express.Router();

const AuthController = require('../../app/controllers/AuthController');
const {
  validateSignUp,
  validateSignIn,
  validateForgetPassword,
  validateResetPassword,
} = require('../../helpers/valid');
const auth = require('../../app/middlewares/auth');

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

module.exports = router;
