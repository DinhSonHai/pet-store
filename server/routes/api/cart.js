const express = require('express');
const router = express.Router();

const CartController = require('../../app/controllers/CartController');
const auth = require('../../app/middlewares/auth');

// @route   GET /api/cart
// @desc    Lấy tất cả sản phẩm trong giỏ hàng của một người dùng
// @access  Private
router.get('/', auth, CartController.index);

// @route   POST /api/cart
// @desc    Thêm sản phẩm vào giỏ hàng
// @access  Private
router.post('/', auth, CartController.addCart);

// @route   PUT /api/cart
// @desc    Cập nhật số lượng một hoặc nhiều sản phẩm trong giỏ hàng
// @access  Private
router.put('/', auth, CartController.updateCart);

// @route   DELETE /api/cart
// @desc    Xóa một sản phẩm trong giỏ hàng
// @access  Private
router.delete('/', auth, CartController.deleteCart);

module.exports = router;