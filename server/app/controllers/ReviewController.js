const Review = require('../models/Review');
const { validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/Product');

class ReviewController {
  // @route   GET api/review/admin/:id/review
  // @desc    Lấy tất cả đánh giá của sản phẩm
  // @access  Private
  async getAllProductReview(req, res, next) {
    try {
      //Lấy tất cả đánh giá của sản phẩm
      let review = await Review.find({
        productId: new ObjectId(req.params.id),
      });
      if (!review) {
        return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
      }
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/review/:id/review
  // @desc    Get all review content of a product
  // @access  Public
  async getProductReview(req, res, next) {
    try {
      //Lấy tất cả đánh giá của sản phẩm đã được duyệt
      let review = await Review.find({
        productId: new ObjectId(req.params.id),
        status: 1,
      });
      if (!review) {
        return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
      }
      review.forEach((rv) => {
        rv.replyComment = rv.replyComment.filter(
          (comment) => comment.status === 1
        );
      });
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/review/:id/review
  // @desc    Review on a product
  // @access  Private
  async review(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: 'Không tìm thấy sản phẩm.' });
      }
      //Kiểm tra req.body
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      let { starRatings, comment } = req.body;
      let review = new Review({
        userId: req.user.id,
        productId: req.params.id,
        starRatings,
        comment,
      });
      await review.save();
      return res.json({ msg: 'Gửi đánh giá thành công' });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/review/:id/review
  // @desc    Comment on a review
  // @access  Private
  async comment(req, res, next) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { replyComment } = req.body;
    try {
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
      }
      const comment = {
        userReplyId: req.user.id,
        replyComment,
      };
      review.replyComment.push(comment);
      await review.save();
      return res.json(review.replyComment);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   DELETE api/review/:id/review/:reviewId/comment/commentId
  // @desc    Delete a comment on a review
  // @access  Private
  async deleteComment(req, res, next) {
    try {
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
      }
      // Kiểm tra xem người dùng có comment ở review này không
      if (
        review.replyComment.filter(
          (comment) => comment.userReplyId.toString() === req.user.id
        ).length === 0
      ) {
        return res.status(404).json({ msg: 'Chưa có bình luận nào' });
      }
      // Lấy thứ tự xóa comment
      const removeIndex = review.replyComment.findIndex(
        (comment) =>
          comment.userReplyId.toString() === req.user.id &&
          comment._id.toString() === req.params.commentId
      );
      review.replyComment.splice(removeIndex, 1);
      await review.save();
      return res.json(review.replyComment);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   DELETE api/review/:id/review/:reviewId
  // @desc    Delete a review
  // @access  Private
  async deleteReview(req, res, next) {
    try {
      await Review.findOneAndRemove({ _id: req.params.reviewId });
      return res.json({ msg: 'Review deleted' });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/review/admin/:id/review/:reviewId/approve
  // @desc    Duyệt đánh giá của người dùng
  // @access  Private
  async approveReview(req, res) {
    try {
      let product = await Product.findOne({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ msg: 'Không tìm thấy sản phẩm này.' });
      }
      let reviewId = req.params.reviewId;
      let review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ msg: 'Không tìm thấy đánh giá này.' });
      }
      let { status } = review;
      // -1: Không phê duyệt đánh giá
      // 0: Đăng đánh giá thành công
      // 1: Đã phê duyệt đánh giá
      if (status === 0 || status === -1) {
        status = 1;
        review = await Review.findOneAndUpdate(
          { _id: reviewId },
          { $set: { status } },
          { new: true }
        );
      }
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/review/admin/:id/review/:reviewId/decline
  // @desc    Từ chối đánh giá của người dùng
  // @access  Private
  async declineReview(req, res) {
    try {
      let product = await Product.findById({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ msg: 'Không tìm thấy sản phẩm này.' });
      }
      let reviewId = req.params.reviewId;
      let review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ msg: 'Không tìm thấy đánh giá này.' });
      }
      let { status } = review;
      // -1: Không phê duyệt đánh giá
      // 0: Đăng đánh giá thành công
      // 1: Đã phê duyệt đánh giá
      if ((status = 0 || status === 1)) {
        status = -1;
        review = await Review.findOneAndUpdate(
          { _id: reviewId },
          { $set: { status } },
          { new: true }
        );
      }
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/review/admin/:id/review/:reviewId/comment/:commentId/approve
  // @desc    Duyệt bình luận trong đánh giá của người dùng
  // @access  Private
  async approveComment(req, res) {
    try {
      let product = await Product.findById({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ msg: 'Không tìm thấy sản phẩm này.' });
      }
      let reviewId = req.params.reviewId;
      let review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ msg: 'Không tìm thấy đánh giá này.' });
      }
      let { replyComment } = review;
      // -1: Không phê duyệt bình luận
      // 0: Đăng bình luận thành công
      // 1: Đã phê duyệt bình luận
      replyComment.forEach((comment) => {
        if (comment._id.toString() === req.params.commentId) {
          if (comment.status === 0 || comment.status === -1) {
            comment.status = 1;
          }
        }
      });
      review = await Review.findOneAndUpdate(
        { _id: reviewId },
        { $set: { replyComment } },
        { new: true }
      );
      return res.json(replyComment);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/review/admin/:id/review/:reviewId/comment/:commentId/decline
  // @desc    Từ chối bình luận trong đánh giá của người dùng
  // @access  Private
  async declineComment(req, res) {
    try {
      let product = await Product.findById({ _id: req.params.id });
      if (!product) {
        return res.status(404).json({ msg: 'Không tìm thấy sản phẩm này.' });
      }
      let reviewId = req.params.reviewId;
      let review = await Review.findById(reviewId);
      if (!review) {
        return res.status(404).json({ msg: 'Không tìm thấy đánh giá này.' });
      }
      let { replyComment } = review;
      // -1: Không phê duyệt bình luận
      // 0: Đăng bình luận thành công
      // 1: Đã phê duyệt bình luận
      replyComment.forEach((comment) => {
        if (comment._id.toString() === req.params.commentId) {
          if (comment.status === 0 || comment.status === 1) {
            comment.status = -1;
          }
        }
      });
      review = await Review.findOneAndUpdate(
        { _id: reviewId },
        { $set: { replyComment } },
        { new: true }
      );
      return res.json(replyComment);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new ReviewController();
