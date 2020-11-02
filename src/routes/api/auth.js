const express = require('express');
const router = express.Router();

const AuthController = require('../../app/controllers/AuthController');
const { validateSignUp, validateSignIn, validateForgetPassword, validateResetPassword } = require('../../helpers/valid');

// @route   GET api/auth/signup
// @desc    Sign up an account
// @access  Public
router.post('/signup', validateSignUp, AuthController.signUp);

// @route   GET api/auth/activate
// @desc    Activate an account
// @access  Public
router.post('/activate', AuthController.activate);

// @route   GET api/auth/signin
// @desc    Sign in
// @access  Public
router.post('/signin', validateSignIn, AuthController.signIn);

module.exports = router;
