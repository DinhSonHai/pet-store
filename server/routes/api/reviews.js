const express = require('express');
const router = express.Router();
const auth = require('../../app/middlewares/auth');
const authAdmin = require('../../app/middlewares/auth_admin');
const checkPermission = require('../../app/middlewares/checkPermission');
const ReviewController = require('../../app/controllers/ReviewController');

const {
  validateComment,
  validateReview,
  validateCommentAdmin,
} = require('../../helpers/valid');

// @route   PUT api/reviews/admin/:reviewId/:productId/approve
// @desc    Duyệt đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:reviewId/:productId/approve',
  authAdmin,
  ReviewController.approveReview
);

// @route   PUT api/reviews/admin/:reviewId/:productId/decline
// @desc    Từ chối đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:reviewId/:productId/decline',
  authAdmin,
  ReviewController.declineReview
);

// @route   PUT api/reviews/admin/:id/review/:reviewId/comment/:commentId/approve
// @desc    Duyệt bình luận trong đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:id/review/:reviewId/comment/:commentId/approve',
  authAdmin,
  ReviewController.approveComment
);

// @route   PUT api/reviews/admin/:id/review/:reviewId/comment/:commentId/decline
// @desc    Từ chối bình luận trong đánh giá của người dùng
// @access  Private
router.put(
  '/admin/:id/review/:reviewId/comment/:commentId/decline',
  authAdmin,
  ReviewController.declineComment
);

// @route   GET api/reviews/admin/reviews
// @desc    Lấy tất cả đánh giá của các sản phẩm chưa đc duyệt phía admin
// @access  Private
router.get(
  '/admin/reviews',
  authAdmin,
  ReviewController.getAllUnconfirmedReviews
);

// @route   GET api/reviews/:id/review
// @desc    Lấy đánh giá của sản phẩm
// @access  Public
router.get('/:id/review', ReviewController.getProductReview);

// @route   POST api/reviews/:id/review
// @desc    Đánh giá sản phẩm
// @access  Private
router.post('/:id/review', [auth, validateReview], ReviewController.review);

// @route   PUT api/reviews/:reviewId/review/:productId
// @desc    Comment on a review client
// @access  Private
router.put(
  '/:reviewId/review/:productId',
  [auth, validateComment],
  ReviewController.comment
);
// @route   PUT api/reviews/:reviewId/response/:productId
// @desc    Response on a review admin
// @access  Private
router.put(
  '/:reviewId/response/:productId',
  [authAdmin, validateCommentAdmin],
  ReviewController.response
);

// // @route   DELETE api/reviews/:id/review/:reviewId/comment/:commentId
// // @desc    Xóa bình luận trên 1 đánh giá
// // @access  Private
// router.delete(
//   '/:id/review/:reviewId/comment/:commentId',
//   auth,
//   ReviewController.deleteComment
// );

// // @route   DELETE api/reviews/:id/review/:reviewId
// // @desc    Xóa bình luận
// // @access  Private
// router.delete('/:id/review/:reviewId', auth, ReviewController.deleteReview);

module.exports = router;
