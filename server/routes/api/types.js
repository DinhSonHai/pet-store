const express = require('express');
const router = express.Router();

const TypeController = require('../../app/controllers/TypeController');
const checkPermission = require('../../app/middlewares/checkPermission');
const authAdmin = require('../../app/middlewares/authAdmin');

// @route   GET api/types
// @desc    Lấy tất cả loại sản phẩm
// @access  Public
router.get('/', authAdmin, TypeController.getAll);

// @route   GET api/types/sell
// @desc    Lấy tất cả loại sản phẩm bán ra
// @access  Public
router.get('/sell', authAdmin, TypeController.getAllTypeSell);

// @route   GET api/types/deleted
// @desc    Lấy tất cả loại sản phẩn soft deleted
// @access  Private
router.get('/deleted', authAdmin, TypeController.getDeleted);

// @route   GET api/types/:id
// @desc    Lấy loại theo id
// @access  Public
router.get('/:id', TypeController.getById);

// @route   GET api/types/categories/:categoryId
// @desc    Lấy loại theo danh mục
// @access  Public
router.get('/categories/:categoryId', TypeController.getByCategoryId);

// @route   POST api/types
// @desc    Tạo loại sản phẩm
// @access  Private
router.post('/', [authAdmin, checkPermission], TypeController.create);

// @route   PUT api/types/:id
// @desc    Sửa loại sản phẩm
// @access  Private
router.put('/:id', [authAdmin, checkPermission], TypeController.update);

// @route   DELETE api/types/:id
// @desc    Soft delete loại sản phẩm (ẩn đi)
// @access  Private
router.delete('/:id', [authAdmin, checkPermission], TypeController.softDelete);

// @route   PATCH api/types/:id/restore
// @desc    Phục hồi loại sản phẩm soft deleted
// @access  Private
router.patch(
  '/:id/restore',
  [authAdmin, checkPermission],
  TypeController.restore
);

module.exports = router;
