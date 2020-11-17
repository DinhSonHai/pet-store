const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');
const checkPermission = require('../../app/middlewares/checkPermission');
const { validateCreateProductInfo, validateUpdateProductInfo } = require('../../helpers/valid');

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', ProductController.index);

// @route   GET api/products/deleted
// @desc    Get all products has been soft deleted
// @access  Private
router.get('/deleted', checkPermission, ProductController.getDeletedProduct);

// @route   GET api/products/:id
// @desc    Get product by id
// @access  Public
router.get('/:id', ProductController.getById);

// @route   GET api/products/types/:typeId
// @desc    Get all products by typeId
// @access  Public
router.get('/types/:typeId', ProductController.getByTypeId);

// @route   GET api/products/categories/:categoryId
// @desc    Get all products by Category
// @access  Public
router.get('/categories/:categoryId', ProductController.getByCategoryId);

// @route   POST api/products
// @desc    Create products
// @access  Private
router.post('/', [checkPermission, validateCreateProductInfo], ProductController.create);

// @route   PUT api/products/:id
// @desc    Update products
// @access  Private
router.put('/:id', [checkPermission, validateUpdateProductInfo], ProductController.update);

// @route   DELETE api/products/:id
// @desc    Soft delete products (hide)
// @access  Private
router.delete('/:id', checkPermission, ProductController.softDelete);

// @route   PATCH api/products/:id/restore
// @desc    Restore products has been soft deleted
// @access  Private
router.patch('/:id/restore', checkPermission, ProductController.restore);

module.exports = router;