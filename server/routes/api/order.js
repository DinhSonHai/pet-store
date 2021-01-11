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
const authAdmin = require('../../app/middlewares/auth_admin');

// @route   GET api/order/:id
// @desc    Lấy đơn hàng theo id
// @access  Private
router.get('/:id', OrderController.getById);

// @route   GET api/order
// @desc    Lấy tất cả đơn hàng phía admin
// @access  Private
router.get('/', authAdmin, OrderController.getAllOrderAdmin);

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
// @access  Private
router.post('/auth', [auth, validateOrderAuth], OrderController.authOrder);

// @route   PUT api/order/auth/:orderId
// @desc    Hủy đơn hàng
// @access  Private
router.put('/auth/:orderId', auth, OrderController.cancleOrder);

// @route   PUT api/order/:orderId
// @desc    Cập nhật trạng thái đơn hàng
// @access  Private
router.put('/:orderId', authAdmin, OrderController.updateOrderStatus);

module.exports = router;
