const express = require('express');
const router = express.Router();

const StatisticalController = require('../../app/controllers/StatisticalController');
const checkPermission = require('../../app/middlewares/checkPermission');
const authAdmin = require('../../app/middlewares/auth_admin');

// @route   GET api/statistical/dailysales
// @desc    Thống kê doanh thu theo ngày
// @access  Private
router.get('/dailysales', [authAdmin, checkPermission], StatisticalController.getDailySales);

// @route   GET api/statistical/newestorders
// @desc    Lấy số đơn hàng mới
// @access  Private
router.get('/newestorders', authAdmin, StatisticalController.getNewestOrders);

module.exports = router;