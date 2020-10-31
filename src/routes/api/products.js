const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', ProductController.index);

// @route   GET api/products/:id
// @desc    Get product by id
// @access  Public
router.get('/:id', ProductController.getById);

// @route   GET api/products/types/:typeId
// @desc    Get all products by typeId
// @access  Public
router.get('/types/:typeId', ProductController.getByTypeId);

module.exports = router;