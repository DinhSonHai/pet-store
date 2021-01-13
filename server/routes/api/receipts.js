const express = require('express');
const router = express.Router();
const ReceiptController = require('../../app/controllers/ReceiptController');
const authAdmin = require('../../app/middlewares/auth_admin');

// @route   GET api/receipts
// @desc    Lấy tất cả phiếu nhập
// @access  Private
router.get('/', authAdmin, ReceiptController.getAll);

// @route   GET api/receipts/:id
// @desc    Lấy tất cả phiếu nhập chi tiết theo id
// @access  Private
router.get('/:id', authAdmin, ReceiptController.getAllDetail);

// @route   POST api/receipts
// @desc    Tạo phiếu nhập
// @access  Private
router.post('/', authAdmin, ReceiptController.add);

module.exports = router;
