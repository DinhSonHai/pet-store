const express = require('express');
const router = express.Router();
const auth = require('../../app/middlewares/auth');
const authAdmin = require('../../app/middlewares/auth_admin');
const checkPermission = require('../../app/middlewares/checkPermission');
const ReviewController = require('../../app/controllers/ReviewController');

const { validateComment, validateReview } = require('../../helpers/valid');

// @route   PUT api/review/admin/:id/review/:reviewId/approve
// @desc    Duyệt đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:id/review/:reviewId/approve',
  authAdmin,
  ReviewController.approveReview
);

// @route   PUT api/review/admin/:id/review/:reviewId/decline
// @desc    Từ chối đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:id/review/:reviewId/decline',
  authAdmin,
  ReviewController.declineReview
);

// @route   PUT api/review/admin/:id/review/:reviewId/comment/:commentId/approve
// @desc    Duyệt bình luận trong đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:id/review/:reviewId/comment/:commentId/approve',
  authAdmin,
  ReviewController.approveComment
);

// @route   PUT api/review/admin/:id/review/:reviewId/comment/:commentId/decline
// @desc    Từ chối bình luận trong đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:id/review/:reviewId/comment/:commentId/decline',
  authAdmin,
  ReviewController.declineComment
);

// @route   GET api/review/admin/:id/review
// @desc    Lấy tất cả đánh giá của sản phẩm
// @access  Private
router.get(
  '/admin/:id/review',
  authAdmin,
  ReviewController.getAllProductReview
);

// @route   GET api/review/:id/review
// @desc    Lấy đánh giá của sản phẩm
// @access  Public
router.get('/:id/review', ReviewController.getProductReview);

// @route   POST api/review/:id/review
// @desc    Đánh giá sản phẩm
// @access  Private
router.post('/:id/review', [auth, validateReview], ReviewController.review);

// @route   PUT api/review/:id/review/:reviewId
// @desc    Bình luận trên 1 đánh giá
// @access  Private
router.put(
  '/:id/review/:reviewId',
  [auth, validateComment],
  ReviewController.comment
);

// @route   DELETE api/review/:id/review/:reviewId/comment/:commentId
// @desc    Xóa bình luận trên 1 đánh giá
// @access  Private
router.delete(
  '/:id/review/:reviewId/comment/:commentId',
  auth,
  ReviewController.deleteComment
);

// @route   DELETE api/review/:id/review/:reviewId
// @desc    Xóa bình luận
// @access  Private
router.delete('/:id/review/:reviewId', auth, ReviewController.deleteReview);

module.exports = router;
