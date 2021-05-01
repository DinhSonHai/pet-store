const Review = require('../models/Review');
const { validationResult } = require('express-validator');
const ObjectId = require('mongoose').Types.ObjectId;
const Product = require('../models/Product');
const User = require('../models/User');
const Employee = require('../models/Employee');
const crudService = require('../../services/crud');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').review;
class ReviewController {
  // @route   GET api/reviews/admin/reviews
  // @desc    Lấy tất cả đánh giá của các sản phẩm chưa đc duyệt phía admin
  // @access  Private
  async getAllUnconfirmedReviews(req, res, next) {
    try {
      const reviews = await crudService.getAdvance(
        Review,
        {
          status: 0,
        },
        {},
        { path: 'productId', select: ['productName'] }
      );
      return res.status(statusCode.success).json(reviews);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
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

      return res.status(statusCode.success).json(review);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   POST api/reviews/:id/review
  // @desc    Review on a product
  // @access  Private
  async review(req, res, next) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    try {
      const [product, user, isReview] = await Promise.all([
        crudService.getById(Product, req.params.id),
        crudService.getById(User, req.user.id),
        crudService.getUnique(Review, {
          userId: new ObjectId(req.user.id),
          productId: new ObjectId(req.params.id),
        }),
      ]);
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.productNotFound }] });
      }
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.userNotFound }] });
      }
      const isPurchased = user.purchasedProducts.some(
        (item) => item.toString() === product._id.toString()
      );
      if (!isPurchased) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.notPurchased }] });
      }

      if (isReview) {
        if (isReview.status === 1) {
          return res
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.alreadyReviewed }] });
        } else {
          return res.status(statusCode.badRequest).json({
            errors: [
              {
                msg: message.isProcessing,
              },
            ],
          });
        }
      }
      let { starRatings, comment } = req.body;
      const status = await crudService.create(Review, {
        userId: user._id,
        productId: req.params.id,
        name: user.name,
        avatar: user.avatar,
        starRatings,
        comment,
      });
      if (status) {
        return res.status(statusCode.success).json({
          message: message.reviewSuccess,
        });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.reviewFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/reviews/:reviewId/response/:productId
  // @desc    Response on a review admin
  // @access  Private
  async response(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    let { replyComment } = req.body;
    try {
      const [review, product, user] = await Promise.all([
        crudService.getById(Review, req.params.reviewId),
        crudService.getById(Product, req.params.productId),
        crudService.getById(User, req.user.id),
      ]);
      if (!review) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.productNotFound }] });
      }
      if (!user) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.userNotFound }] });
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
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.repFail }] });
        }
        return res.status(statusCode.success).json({
          message: message.repSuccess,
        });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/reviews/admin/:reviewId/:productId/approve
  // @desc    Duyệt đánh giá của người dùng
  // @access  Private
  async approveReview(req, res) {
    const { reviewId, productId } = req.params;
    try {
      const [product, review] = await Promise.all([
        crudService.getById(Product, productId),
        crudService.getById(Review, reviewId),
      ]);
      if (!review) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.productNotFound }] });
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
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.error }] });
      }
      await review.save((err, data) => {
        if (err) {
          return res
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.approveFail }] });
        }
        return res
          .status(statusCode.success)
          .json({ message: message.approveSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/reviews/admin/:reviewId/:productId/decline
  // @desc    Từ chối đánh giá của người dùng
  // @access  Private
  async declineReview(req, res) {
    const { reviewId, productId } = req.params;
    try {
      const [product, review] = await Promise.all([
        crudService.getById(Product, productId),
        crudService.getById(Review, reviewId),
      ]);
      if (!review) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.productNotFound }] });
      }
      await review.remove((err, _) => {
        if (err) {
          return res
            .status(statusCode.badRequest)
            .json({ errors: [{ msg: message.declineFail }] });
        }
        return res
          .status(statusCode.success)
          .json({ message: message.declineSuccess });
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
}

module.exports = new ReviewController();
