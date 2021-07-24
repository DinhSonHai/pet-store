const express = require("express");
const router = express.Router();

const CustomerController = require("../../app/controllers/CustomerController");
const authAdmin = require("../../app/middlewares/authAdmin");

// @route   GET api/customers
// @desc    Lấy tất cả khách hàng
// @access  Private
router.get("/", authAdmin, CustomerController.getAll);

// @route   GET api/customers/:id
// @desc    Lấy số lượng đơn hàng đang xử lý, đã hoàn tất, đã hủy
// @access  Private
router.get("/:id", authAdmin, CustomerController.getDetail);

module.exports = router;
