const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');
const checkPermission = require('../../app/middlewares/checkPermission');
const authAdmin = require('../../app/middlewares/auth_admin');

const {
  validateCreateProductInfo,
  validateUpdateProductInfo,
} = require('../../helpers/valid');

// @route   GET api/products/deleted
// @desc    Lấy tất cả sản phẩm đã ẩn đi
// @access  Private
router.get('/deleted', authAdmin, ProductController.getDeleted);

// @route   GET api/products/search
// @desc    Tìm kiếm sản phẩm theo từ khóa
// @access  Public
router.get('/search', ProductController.search);

// @route   GET api/products
// @desc    Lấy tất cả sản phẩm
// @access  Public
router.get('/', ProductController.getAll);

// @route   GET api/products/:id
// @desc    Lấy sản phẩm theo id
// @access  Public
router.get('/:id', ProductController.getById);

// @route   GET api/products/types/:typeId
// @desc    Lấy tất cả sản phẩm theo typeId
// @access  Public
router.get('/types/:typeId', ProductController.getByTypeId);

// @route   GET api/products/categories/:categoryId
// @desc    Lấy tất cả sản phẩm theo categoryId
// @access  Public
router.get('/categories/:categoryId', ProductController.getByCategoryId);

// @route   POST api/products
// @desc    Tạo sản phẩm
// @access  Private
router.post(
  '/',
  [authAdmin, checkPermission, validateCreateProductInfo],
  ProductController.add
);

// @route   PUT api/products
// @desc    Cập nhật sản phẩm
// @access  Private
router.put(
  '/',
  [authAdmin, checkPermission, validateUpdateProductInfo],
  ProductController.edit
);

// @route   DELETE api/products/:id
// @desc    Xóa mềm
// @access  Private
router.delete(
  '/:id',
  [authAdmin, checkPermission],
  ProductController.softDelete
);

// @route   PATCH api/products/:id/restore
// @desc    Phục hồi sản phẩm đã xóa mềm
// @access  Private
router.patch(
  '/:id/restore',
  [authAdmin, checkPermission],
  ProductController.restore
);

module.exports = router;
