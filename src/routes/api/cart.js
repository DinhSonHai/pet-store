const express = require('express');
const router = express.Router();

const CartController = require('../../app/controllers/CartController');
const auth = require('../../app/middlewares/auth');

// @route   GET api/cart/getcart
// @desc    Lấy tất cả sản phẩm trong giỏ hàng của một người dùng
// @access  Public
router.get('/', auth, CartController.index);

// @route   POST api/cart/addcart
// @desc    Thêm sản phẩm vào giỏ hàng
// @access  Public
router.post('/addcart', auth, CartController.addCart);

module.exports = router;