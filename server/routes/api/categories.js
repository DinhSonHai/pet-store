const express = require('express');
const router = express.Router();

const CategoryController = require('../../app/controllers/CategoryController');

// @route   GET api/categories
// @desc    Get all categories
// @access  Public
router.get('/', CategoryController.index);

// @route   GET api/categories/:id
// @desc    Get category by id
// @access  Public
router.get('/:id', CategoryController.getById);

module.exports = router;