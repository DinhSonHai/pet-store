const express = require('express');
const router = express.Router();

const OrderController = require('../../app/controllers/OrderController');
const {
  validateOrder,
  validateUpdateAddress,
  validateOrderAuth,
  validateOrderAdmin,
} = require('../../helpers/valid');
const auth = require('../../app/middlewares/auth');
const authAdmin = require('../../app/middlewares/auth_admin');

// @route   GET api/orders/auth/:id
// @desc    Lấy đơn hàng theo id phía người dùng
// @access  Private
router.get('/auth/:id', auth, OrderController.getById);

// @route   GET api/orders
// @desc    Lấy tất cả đơn hàng phía admin
// @access  Private
router.get('/', authAdmin, OrderController.getAllOrderAdmin);

// @route   GET api/orders/detail/auth/:id
// @desc    Lấy chi tiết đơn hàng theo orderId phía người dùng
// @access  Private
router.get(
  '/detail/auth/:id',
  auth,
  OrderController.getOrdersDetailByOrderIdAuth
);

// @route   GET api/orders/orders_processing/auth
// @desc    Lấy đơn hàng đang xử lí phía người dùng
// @access  Private
router.get(
  '/orders_processing/auth',
  auth,
  OrderController.getProcessingOrders
);

// @route   GET api/orders/orders_completed/auth
// @desc    Lấy đơn hàng hoàn tất phía người dùng
// @access  Private
router.get('/orders_completed/auth', auth, OrderController.getCompletedOrders);

// @route   GET api/orders/orders_canceled/auth
// @desc    Lấy đơn hàng bị hủy phía người dùng
// @access  Private
router.get('/orders_canceled/auth', auth, OrderController.getCanceledOrders);

// @route   GET api/orders/admin/:id
// @desc    Lấy đơn hàng theo orderId phía admin
// @access  Private
router.get('/admin/:id', authAdmin, OrderController.getByIdAdmin);

// @route   GET api/orders/detail/admin/:id
// @desc    Lấy chi tiết đơn hàng theo orderId phía admin
// @access  Private
router.get(
  '/detail/admin/:id',
  authAdmin,
  OrderController.getOrdersDetailByOrderIdAdmin
);

// @route   GET api/orders/:status/admin
// @desc    Lấy các đơn hàng theo trạng thái phía admin
// @access  Private
router.get('/:status/admin', authAdmin, OrderController.getOrdersByStatusAdmin);

// @route   POST api/orders
// @desc    Đặt hàng guest
// @access  Public
router.post(
  '/',
  [validateUpdateAddress, validateOrder],
  OrderController.guestOrder
);

// @route   POST api/orders/admin
// @desc    Đặt hàng vai trò khách, xử lí ở admin
// @access  Private
router.post(
  '/admin',
  [authAdmin, validateOrderAdmin],
  OrderController.adminOrder
);

// @route   POST api/orders/auth
// @desc    Đặt hàng user
// @access  Private
router.post('/auth', [auth, validateOrderAuth], OrderController.authOrder);

// @route   PUT api/orders/auth/:orderId
// @desc    Hủy đơn hàng phia nguoi dung
// @access  Private
router.put('/auth/:orderId', auth, OrderController.cancleOrder);

// @route   PUT api/orders/admin/:orderId
// @desc    Hủy đơn hàng phia admin
// @access  Private
router.put('/admin/:orderId', authAdmin, OrderController.cancleOrderAdmin);

// @route   PUT api/orders/:orderId
// @desc    Cập nhật trạng thái đơn hàng phía admin
// @access  Private
router.put('/:orderId', authAdmin, OrderController.updateOrderStatus);

// @route   GET api/orders/invoice/:id
// @desc    Lấy dữ liệu in hóa đơn
// @access  Private
router.get('/invoice/:id', authAdmin, OrderController.invoice);

module.exports = router;
