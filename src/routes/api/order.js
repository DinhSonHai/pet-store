const express = require('express');
const router = express.Router();

const OrderController = require('../../app/controllers/OrderController');
const getInfo = require('../../app/middlewares/getInfo');

// @route   POST api/order
// @desc    Đặt hàng
// @access  Public
router.post('/', getInfo, OrderController.order);

module.exports = router;
