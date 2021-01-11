const express = require('express');
const router = express.Router();

const ProductController = require('../../app/controllers/ProductController');
const auth = require('../../app/middlewares/auth');
const checkPermission = require('../../app/middlewares/checkPermission');
const authAdmin = require('../../app/middlewares/auth_admin');

const {
  validateCreateProductInfo,
  validateUpdateProductInfo,
  validateComment,
  validateReview,
} = require('../../helpers/valid');

// @route   PUT api/products/admin/:id/review/:reviewId/approve
// @desc    Duyệt đánh giá của người dùng
// @access  Private
router.put('/admin/:id/review/:reviewId/approve', checkPermission, ProductController.approveReview);

// @route   PUT api/products/admin/:id/review/:reviewId/decline
// @desc    Từ chối đánh giá của người dùng
// @access  Private
router.put('/admin/:id/review/:reviewId/decline', checkPermission, ProductController.declineReview);

// @route   PUT api/products/admin/:id/review/:reviewId/comment/:commentId/approve
// @desc    Duyệt bình luận trong đánh giá của người dùng
// @access  Private
router.put('/admin/:id/review/:reviewId/comment/:commentId/approve', checkPermission, ProductController.approveComment);

// @route   PUT api/products/admin/:id/review/:reviewId/comment/:commentId/decline
// @desc    Từ chối bình luận trong đánh giá của người dùng
// @access  Private
router.put('/admin/:id/review/:reviewId/comment/:commentId/decline', checkPermission, ProductController.declineComment);

// @route   GET api/products
// @desc    Get all products
// @access  Public
router.get('/', ProductController.getAll);

// @route   GET api/products/deleted
// @desc    Get all products has been soft deleted
// @access  Private
router.get('/deleted', authAdmin, ProductController.getDeleted);


// @route   GET api/products/admin/:id/review
// @desc    Lấy tất cả đánh giá của sản phẩm
// @access  Private
router.get('/admin/:id/review', checkPermission, ProductController.getAllProductReview);

// @route   GET api/products/:id/review
// @desc    Lấy đánh giá của sản phẩm
// @access  Public
router.get('/:id/review', ProductController.getProductReview);

// @route   POST api/products/:id/review
// @desc    Review on a product
// @access  Private
router.post('/:id/review', [auth, validateReview], ProductController.review);

// @route   PUT api/products/:id/review/:reviewId
// @desc    Comment on a review
// @access  Private
router.put(
  '/:id/review/:reviewId',
  [auth, validateComment],
  ProductController.comment
);

// @route   DELETE api/products/:id/review/:reviewId/comment/:commentId
// @desc    Delete a comment on a review
// @access  Private
router.delete(
  '/:id/review/:reviewId/comment/:commentId',
  auth,
  ProductController.deleteComment
);

// @route   DELETE api/products/:id/review/:reviewId
// @desc    Delete a review
// @access  Private
router.delete('/:id/review/:reviewId', auth, ProductController.deleteReview);

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
router.post(
  '/',
  [authAdmin, checkPermission, validateCreateProductInfo],
  ProductController.Add
);

// @route   PUT api/products
// @desc    Update products
// @access  Private
router.put(
  '/',
  [authAdmin, checkPermission, validateUpdateProductInfo],
  ProductController.Edit
);

// @route   DELETE api/products/:id
// @desc    Soft delete products (hide)
// @access  Private
router.delete(
  '/:id',
  [authAdmin, checkPermission],
  ProductController.softDelete
);

// @route   PATCH api/products/:id/restore
// @desc    Restore products has been soft deleted
// @access  Private
router.patch(
  '/:id/restore',
  [authAdmin, checkPermission],
  ProductController.restore
);

module.exports = router;
