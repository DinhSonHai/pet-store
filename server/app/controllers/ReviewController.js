const Review = require('../models/Review');
const { validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/Product');
const User = require('../models/User');
const Employee = require('../models/Employee');
class ReviewController {
  // @route   GET api/reviews/admin/reviews
  // @desc    Lấy tất cả đánh giá của các sản phẩm chưa đc duyệt phía admin
  // @access  Private
  async getAllUnconfirmedReviews(req, res, next) {
    try {
      const reviews = await Review.find({
        status: 0,
      }).populate({ path: 'productId', select: ['productName'] });
      return res.json(reviews);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/reviews/:id/review
  // @desc    Lấy tất cả đánh giá của sản phẩm đã được duyệt phía client
  // @access  Public
  async getProductReview(req, res, next) {
    try {
      let review = await Review.find({
        productId: new ObjectId(req.params.id),
        status: 1,
      })
        .populate({
          path: 'replyComment',
          populate: { path: 'adminReplyId', select: ['role'] },
        })
        .populate({
          path: 'userReplyId',
          populate: { path: 'userReplyId', select: ['role'] },
        });
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

  // @route   POST api/reviews/:id/review
  // @desc    Review on a product
  // @access  Private
  async review(req, res, next) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy sản phẩm.' }] });
      }
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Người dùng không tồn tại.' }] });
      }
      const isPurchased = user.purchasedProducts.some(
        (item) => item.toString() === product._id.toString()
      );
      if (!isPurchased) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Bạn chưa mua sản phẩm này!' }] });
      }
      const isReview = await Review.findOne({
        userId: new ObjectId(req.user.id),
        productId: new ObjectId(req.params.id),
      });
      if (isReview) {
        if (isReview.status === 1) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Bạn đã đánh giá sản phẩm này!' }] });
        } else {
          return res.status(400).json({
            errors: [
              {
                msg: 'Không thể đánh giá, đánh giá của bạn đang chờ phê duyệt!',
              },
            ],
          });
        }
      }
      let { starRatings, comment } = req.body;
      let review = new Review({
        userId: user._id,
        productId: req.params.id,
        name: user.name,
        avatar: user.avatar,
        starRatings,
        comment,
      });
      review.key = review._id;
      await review.save((err, data) => {
        if (err) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Gửi đánh giá thất bại' }] });
        }
        return res.json({
          message:
            'Gửi đánh giá thành công!. Đánh giá của bạn sẽ được phê duyệt phụ thuộc vào nhân phẩm của bạn.',
        });
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/reviews/:reviewId/response/:productId
  // @desc    Response on a review admin
  // @access  Private
  async response(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { replyComment } = req.body;
    try {
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy đánh giá' }] });
      }
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy sản phẩm.' }] });
      }
      const user = await Employee.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Nhân viên không tồn tại.' }] });
      }
      const comment = {
        adminReplyId: user._id,
        replyComment,
        name: user.name,
        avatar: user.avatar,
        status: 1,
      };
      review.replyComment = [comment, ...review.replyComment];
      await review.save((err, data) => {
        if (err) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Phản hồi thất bại!' }] });
        }
        return res.json({
          message: 'Phản hồi thành công!',
        });
      });
    } catch (error) {}
  }

  // @route   PUT api/reviews/:reviewId/review/:productId
  // @desc    Comment on a review client
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
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy đánh giá' }] });
      }
      const product = await Product.findById(req.params.productId);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy sản phẩm.' }] });
      }
      const user = await User.findById(req.user.id);
      if (!user) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Người dùng không tồn tại.' }] });
      }
      const comment = {
        userReplyId: user._id,
        replyComment,
        name: user.name,
        avatar: user.avatar,
      };
      review.replyComment = [comment, ...review.replyComment];
      await review.save((err, data) => {
        if (err) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Gửi bình luận thất bại' }] });
        }
        return res.json({
          message:
            'Gửi bình luận thành công!. Bình luận của bạn sẽ được phê duyệt phụ thuộc vào nhân phẩm của bạn.',
        });
      });
      return res.json(review.replyComment);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // // @route   DELETE api/reviews/:id/review/:reviewId/comment/commentId
  // // @desc    Delete a comment on a review
  // // @access  Private
  // async deleteComment(req, res, next) {
  //   try {
  //     const review = await Review.findById(req.params.reviewId);
  //     if (!review) {
  //       return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
  //     }
  //     // Kiểm tra xem người dùng có comment ở review này không
  //     if (
  //       review.replyComment.filter(
  //         (comment) => comment.userReplyId.toString() === req.user.id
  //       ).length === 0
  //     ) {
  //       return res.status(404).json({ msg: 'Chưa có bình luận nào' });
  //     }
  //     // Lấy thứ tự xóa comment
  //     const removeIndex = review.replyComment.findIndex(
  //       (comment) =>
  //         comment.userReplyId.toString() === req.user.id &&
  //         comment._id.toString() === req.params.commentId
  //     );
  //     review.replyComment.splice(removeIndex, 1);
  //     await review.save();
  //     return res.json(review.replyComment);
  //   } catch (err) {
  //     return res.status(500).send('Server Error');
  //   }
  // }

  // // @route   DELETE api/reviews/:id/review/:reviewId
  // // @desc    Delete a review
  // // @access  Private
  // async deleteReview(req, res, next) {
  //   try {
  //     await Review.findOneAndRemove({ _id: req.params.reviewId });
  //     return res.json({ msg: 'Review deleted' });
  //   } catch (err) {
  //     return res.status(500).send('Server Error');
  //   }
  // }

  // @route   PUT api/reviews/admin/:reviewId/:productId/approve
  // @desc    Duyệt đánh giá của người dùng
  // @access  Private
  async approveReview(req, res) {
    const { reviewId, productId } = req.params;
    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy sản phẩm.' }] });
      }
      const review = await Review.findById(reviewId);
      if (!review) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy đánh giá.' }] });
      }
      let { status } = review;
      // -1: Không phê duyệt đánh giá
      // 0: Đăng đánh giá thành công
      // 1: Đã phê duyệt đánh giá
      if (status === 0 || status === -1) {
        review.status = 1;
        product.reviewsCount = product.reviewsCount + 1;
        product.starsCount = product.starsCount + review.starRatings;
        let num1 = parseInt(product.starsCount / product.reviewsCount);
        let num2 = product.starsCount / product.reviewsCount;
        let starRatings = num2 - num1;
        if (starRatings >= 0.5) {
          starRatings = num1 + 1;
        } else {
          starRatings = num1;
        }
        product.starRatings = starRatings;
        await product.save();
      } else {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Không thể duyệt đánh giá này.' }] });
      }
      await review.save((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Duyệt thất bại!' }] });
        }
        return res.json({ message: 'Duyệt thành công!' });
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/reviews/admin/:reviewId/:productId/decline
  // @desc    Từ chối đánh giá của người dùng
  // @access  Private
  async declineReview(req, res) {
    try {
      let product = await Product.findById(req.params.productId);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy sản phẩm này.' }] });
      }
      let review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy đánh giá này.' }] });
      }
      await review.remove((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Hủy thất bại!' }] });
        }
        return res.json({ message: 'Hủy thành công!' });
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/reviews/admin/:id/review/:reviewId/comment/:commentId/approve
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

  // @route   PUT api/reviews/admin/:id/review/:reviewId/comment/:commentId/decline
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
