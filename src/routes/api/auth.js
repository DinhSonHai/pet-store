const express = require('express');
const router = express.Router();

const AuthController = require('../../app/controllers/AuthController');
const { validateSignUp, validateSignIn, validateForgetPassword, validateResetPassword } = require('../../helpers/valid');

// @route   GET api/auth/signup
// @desc    Sign up an account
// @access  Public
router.post('/signup', validateSignUp, AuthController.signUp);

module.exports = router;