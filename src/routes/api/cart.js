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

// @route   POST api/cart/updateCart
// @desc    Cập nhật số lượng một hoặc nhiều sản phẩm trong giỏ hàng
// @access  Public
router.post('/updatecart', auth, CartController.updateCart);

module.exports = router;