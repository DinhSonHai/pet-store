const express = require('express');
const router = express.Router();

const CategoryController = require('../../app/controllers/CategoryController');
const checkPermission = require('../../app/middlewares/checkPermission');
const authAdmin = require('../../app/middlewares/authAdmin');

// @route   GET api/categories
// @desc    Lấy tất cả danh mục
// @access  Public
router.get('/', authAdmin, CategoryController.getAll);

// @route   GET api/categories/deleted
// @desc    Lây tất cả danh mục soft deleted
// @access  Private
router.get('/deleted', authAdmin, CategoryController.getDeleted);

// @route   GET api/categories/:id
// @desc    Lấy danh mục theo id
// @access  Public
router.get('/:id', authAdmin, CategoryController.getById);

// @route   POST api/categories
// @desc    Tạo danh mục
// @access  Private
router.post('/', [authAdmin, checkPermission], CategoryController.create);

// @route   PUT api/categories/:id
// @desc    Sửa danh mục
// @access  Private
router.put('/:id', [authAdmin, checkPermission], CategoryController.update);

// @route   DELETE api/categories/:id
// @desc    Soft delete danh mục (ẩn đi)
// @access  Private
router.delete(
  '/:id',
  [authAdmin, checkPermission],
  CategoryController.softDelete
);

// @route   PATCH api/categories/:id/restore
// @desc    Phục hồi danh mục soft deleted
// @access  Private
router.patch(
  '/:id/restore',
  [authAdmin, checkPermission],
  CategoryController.restore
);

module.exports = router;
