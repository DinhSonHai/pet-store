const express = require('express');
const router = express.Router();

const TypeController = require('../../app/controllers/TypeController');

// @route   GET api/types
// @desc    Get all types
// @access  Public
router.get('/', TypeController.index);

// @route   GET api/types/:id
// @desc    Get type by id
// @access  Public
router.get('/:id', TypeController.getById);

module.exports = router;