const express = require('express');
const router = express.Router();
const authAdmin = require('../../app/middlewares/auth_admin');
const BillController = require('../../app/controllers/BillController');

// @route   GET api/bills
// @desc    Lấy tất cả hóa đơn
// @access  Private
router.get('/', authAdmin, BillController.getAll);

// @route   GET api/bills/:id
// @desc    Lấy hóa đơn theo id
// @access  Private
router.get('/:id', authAdmin, BillController.getById);

// @route   GET api/bills/detail/:id
// @desc    Lấy tất cả chi tiết hóa đơn theo id hóa đơn
// @access  Private
router.get('/detail/:id', authAdmin, BillController.getBillsDetail);

// @route   GET api/bills/invoice/:id
// @desc    Lấy dữ liệu in hóa đơn
// @access  Private
router.get('/invoice/:id', authAdmin, BillController.invoice);

module.exports = router;
