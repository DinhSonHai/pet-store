const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', ProductController.index);

module.exports = router;