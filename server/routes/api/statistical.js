const express = require('express');
const router = express.Router();

const StatisticalController = require('../../app/controllers/StatisticalController');
const checkPermission = require('../../app/middlewares/checkPermission');
const authAdmin = require('../../app/middlewares/auth_admin');

// @route   GET api/statistical/dailyrevenues
// @desc    Thống kê doanh thu theo ngày
// @access  Admin, Private
router.get('/dailyrevenues', [authAdmin, checkPermission], StatisticalController.getDailyRevenues);

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

// @route   GET api/statistical/dailybills
// @desc    Lấy số hóa đơn được bán ra trong ngày
// @access  Private
router.get('/dailybills', authAdmin, StatisticalController.getDailyBills);

// @route   GET api/statistical/dailysales
// @desc    Lấy số sản phẩm được bán ra trong ngày
// @access  Private
router.get('/dailysales', authAdmin, StatisticalController.getDailySales);

module.exports = router;