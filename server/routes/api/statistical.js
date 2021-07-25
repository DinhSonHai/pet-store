const express = require("express");
const router = express.Router();

const StatisticalController = require("../../app/controllers/StatisticalController");
const authAdmin = require("../../app/middlewares/authAdmin");

// @route   GET api/statistical/totalrevenues
// @desc    Thống kê doanh thu theo thời gian
// @access  Admin, Private
router.get("/totalrevenues", authAdmin, StatisticalController.getTotalRevenues);

// @route   GET api/statistical/newestorders
// @desc    Lấy số đơn hàng mới
// @access  Private
router.get("/newestorders", authAdmin, StatisticalController.getNewestOrders);

// @route   GET api/statistical/newestreviews
// @desc    Lấy số đánh giá mới
// @access  Private
router.get("/newestreviews", authAdmin, StatisticalController.getNewestReviews);

// @route   GET api/statistical/users
// @desc    Lấy số lượng người dùng
// @access  Private
router.get("/users", authAdmin, StatisticalController.getUserCount);

// @route   GET api/statistical/totalbills
// @desc    Lấy số hóa đơn hoàn thành theo thời gian
// @access  Admin, Private
router.get('/totalbills', authAdmin, StatisticalController.getTotalBills);

// @route   GET api/statistical/totalsales
// @desc    Lấy số sản phẩm được bán ra theo thời gian
// @access  Private
router.get('/totalsales', authAdmin, StatisticalController.getTotalSales);

// @route   GET api/statistical/bestsellers
// @desc    Lấy top 3 sản phẩm bán chạy theo thời gian
// @access  Private
router.get('/bestsellers', authAdmin, StatisticalController.getBestSellers);

// @route   GET api/statistical/ordersdatachart/:year
// @desc    Lấy dữ liệu số đơn được đặt theo từng tháng
// @access  Private
router.get(
  "/ordersdatachart/:year",
  authAdmin,
  StatisticalController.getOrdersDataChart
);

// @route   GET api/statistical/revenuesdatachart/:year
// @desc    Lấy dữ liệu doanh thu theo từng tháng
// @access  Private
router.get(
  "/revenuesdatachart/:year",
  authAdmin,
  StatisticalController.getRevenuesDataChart
);

module.exports = router;
