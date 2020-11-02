const express = require('express');
const router = express.Router();

const CartController = require('../../app/controllers/CartController');
const auth = require('../../app/middlewares/auth');

// @route   GET api/cart/add
// @desc    Add product to cart
// @access  Public
router.post('/add', auth, CartController.add);
