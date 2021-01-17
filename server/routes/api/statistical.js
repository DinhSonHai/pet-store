const express = require('express');
const router = express.Router();

const StatisticalController = require('../../app/controllers/StatisticalController');
const checkPermission = require('../../app/middlewares/checkPermission');
const authAdmin = require('../../app/middlewares/auth_admin');

// @route   GET api/statistical/todayrevenues
// @desc    Thống kê doanh thu nagfy hôm nay
// @access  Admin, Private
router.get('/todayrevenues', [authAdmin, checkPermission], StatisticalController.getTodayRevenues);

// @route   GET api/statistical/monthlyrevenues
// @desc    Thống kê doanh thu theo tháng
// @access  Admin, Private
router.get('/monthlyrevenues', [authAdmin, checkPermission], StatisticalController.getMonthlyRevenues);

// @route   GET api/statistical/newestorders
// @desc    Lấy số đơn hàng mới
// @access  Private
router.get('/newestorders', authAdmin, StatisticalController.getNewestOrders);

// @route   GET api/statistical/newestreviews
// @desc    Lấy số đánh giá mới
// @access  Private
router.get('/newestreviews', authAdmin, StatisticalController.getNewestReviews);

// @route   GET api/statistical/newestcomments
// @desc    Lấy số bình luận mới
// @access  Private
router.get('/newestcomments', authAdmin, StatisticalController.getNewestComments);

// @route   GET api/statistical/todaybills
// @desc    Lấy số hóa đơn được bán ra trong ngày
// @access  Admin, Private
router.get('/todaybills', [authAdmin, checkPermission], StatisticalController.getTodayBills);

// @route   GET api/statistical/todaysales
// @desc    Lấy số sản phẩm được bán ra trong ngày
// @access  Private
router.get('/todaysales', authAdmin, StatisticalController.getTodaySales);

module.exports = router;