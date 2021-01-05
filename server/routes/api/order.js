const express = require('express');
const router = express.Router();

const OrderController = require('../../app/controllers/OrderController');
// const getInfo = require('../../app/middlewares/getInfo');
const {
  validateOrder,
  validateUpdateAddress,
  validateOrderAuth,
} = require('../../helpers/valid');
const auth = require('../../app/middlewares/auth');
const checkPermission = require('../../app/middlewares/checkPermission');

// @route   POST api/order
// @desc    Đặt hàng guest
// @access  Public
router.post(
  '/',
  [validateUpdateAddress, validateOrder],
  OrderController.guestOrder
);

// @route   POST api/order/auth
// @desc    Đặt hàng user
// @access  Public
router.post('/auth', [auth, validateOrderAuth], OrderController.authOrder);

// @route   PUT api/order/:orderId
// @desc    Cập nhật trạng thái đơn hàng
// @access  Private
router.put('/:orderId', checkPermission, OrderController.updateOrderStatus);

module.exports = router;
