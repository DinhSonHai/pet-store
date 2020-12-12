const express = require('express');
const router = express.Router();
const ClientController = require('../../app/controllers/ClientController');

// @route   GET /api/client/province
// @desc    Lấy tỉnh thành
// @access  Public
router.get('/province', ClientController.getProvince);

// @route   GET /api/client/ward/:province_id
// @desc    Lấy quận huyện theo tỉnh thành
// @access  Public
router.get('/ward/:province_id', ClientController.getWard);

// @route   GET /api/client/town/ward_id
// @desc    Lấy xã, thị trấn theo quận huyện
// @access  Public
router.get('/town/:ward_id', ClientController.getTown);

module.exports = router;
