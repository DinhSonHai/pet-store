const { validationResult } = require('express-validator');

const Product = require('../models/Product');
const Type = require('../models/Type');
const Review = require('../models/Review');
const ObjectId = require('mongoose').Types.ObjectId;

class ProductController {

  // @route   PUT api/products/admin/:id/review/:reviewId/approve
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
          { $set: { status }},
          { new: true }
        );
      }
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error'); 
    }
  }

  // @route   PUT api/products/admin/:id/review/:reviewId/decline
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
      if (status = 0 || status === 1) {
        status = -1;
        review = await Review.findOneAndUpdate(
          { _id: reviewId },
          { $set: { status }},
          { new: true }
        );
      }
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error'); 
    }
  }

  // @route   PUT api/products/admin/:id/review/:reviewId/comment/:commentId/approve
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
      replyComment.forEach(comment => {
        if (comment._id.toString() === req.params.commentId) {
          if (comment.status === 0 || comment.status === -1) {
            comment.status = 1;
          }
        }
      })
      review = await Review.findOneAndUpdate(
        { _id: reviewId },
        { $set: { replyComment }},
        { new: true }
      );
      return res.json(replyComment);
    } catch (err) {
      return res.status(500).send('Server Error'); 
    }
  }

// @route   PUT api/products/admin/:id/review/:reviewId/comment/:commentId/decline
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
      replyComment.forEach(comment => {
        if (comment._id.toString() === req.params.commentId) {
          if (comment.status === 0 || comment.status === 1) {
            comment.status = -1;
          }
        }
      })
      review = await Review.findOneAndUpdate(
        { _id: reviewId },
        { $set: { replyComment }},
        { new: true }
      );
      return res.json(replyComment);
    } catch (err) {
      return res.status(500).send('Server Error'); 
    }
  }

  // @route   GET api/products
  // @desc    Get all products
  // @access  Public
  async index(req, res, next) {
    try {
      let type = Number(req.query.type);
      if (type === 0) {
      } else if (type === 1) {
      } else if (type === 2) {
        const products = await Product.find().sort({ price: 'asc' });
        if (!products) {
          return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
        }
        return res.json(products);
      } else if (type === 3) {
        const products = await Product.find().sort({ price: 'desc' });
        if (!products) {
          return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
        }
        return res.json(products);
      }
      const products = await Product.find().sort({ createdAt: 'desc' });
      if (!products) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
      }
      return res.json(products);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/:id
  // @desc    Get product by id
  // @access  Public
  async getById(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
      }
      return res.json(product);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/types/:typeId
  // @desc    Get all products by typeId
  // @access  Public
  async getByTypeId(req, res, next) {
    const filterStatus = req.query.sort;
    const typeId = new ObjectId(req.params.typeId);
    const page = parseInt(req.query.page) || 1;
    const query = { typeId: { $eq: typeId } };
    const limit = 12;
    const start = (page - 1) * limit;
    const end = page * limit;
    const filterValue =
      filterStatus === 'undefined'
        ? { createdAt: -1 }
        : filterStatus === 'desc'
        ? { price: -1 }
        : { price: 1 };
    try {
      const products = await Product.find(query).sort(filterValue);
      return res.json({
        data: products.slice(start, end),
        total: products.length,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/admin/:id/review
  // @desc    Lấy tất cả đánh giá của sản phẩm
  // @access  Private
  async getAllProductReview(req, res, next) {
    try {
      //Lấy tất cả đánh giá của sản phẩm
      let review = await Review.find({ productId: new ObjectId(req.params.id) });
      if (!review) {
        return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
      }
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/:id/review
  // @desc    Get all review content of a product
  // @access  Public
  async getProductReview(req, res, next) {
    try {
      //Lấy đánh giá của sản phẩm
      let review = await Review.find({ productId: new ObjectId(req.params.id), status: 1 });
      if (!review) {
        return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
      }
      review.forEach(rv => {
        rv.replyComment = rv.replyComment.filter(comment => comment.status === 1);
      })
      return res.json(review);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/products/:id/review
  // @desc    Review on a product
  // @access  Private
  async review(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if(!product) {
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
        comment });
      await review.save();
      return res.json({ msg: 'Gửi đánh giá thành công' });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   DELETE api/products/:id/review/:reviewId
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

  // @route   PUT api/products/:id/review
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
        replyComment
      }
      review.replyComment.push(comment);
      await review.save();
      return res.json(review.replyComment);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   DELETE api/products/:id/review/:reviewId/comment/commentId
  // @desc    Delete a comment on a review
  // @access  Private
  async deleteComment(req, res, next) {
    try {
      const review = await Review.findById(req.params.reviewId);
      if (!review) {
        return res.status(404).json({ msg: 'Chưa có đánh giá nào' });
      }
      // Kiểm tra xem người dùng có comment ở review này không
      if (review.replyComment.filter(comment => comment.userReplyId.toString() === req.user.id).length === 0) {
        return res.status(404).json({ msg: 'Chưa có bình luận nào' });
      }
      // Lấy thứ tự xóa comment
      const removeIndex = review.replyComment.findIndex(
        comment => comment.userReplyId.toString() === req.user.id && comment._id.toString() === req.params.commentId);
      review.replyComment.splice(removeIndex, 1);
      await review.save();
      return res.json(review.replyComment);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/categories/:categoryId
  // @desc    Get all products by Category
  // @access  Public
  async getByCategoryId(req, res, next) {
    try {
      //Lấy tất cả loại theo danh mục sản phẩm
      const types = await Type.find({
        categoryId: new ObjectId(req.params.categoryId),
      }).select('_id');
      if (!types) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
      }
      //Lấy ra _id từ Type object
      const ids = types.map((type) => type['_id']);
      //Lấy tất cả sản phẩm theo danh sách loại sản phẩm
      const products = await Product.find().where('typeId').in(ids);
      if (!products) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
      }
      return res.json(products);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/products
  // @desc    Add products
  // @access  Private
  async create(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let {
      productName,
      age,
      gender,
      color,
      weight,
      origin,
      description,
      images,
      price,
      quantity,
      typeId,
    } = req.body;
    try {
      let product = new Product({
        productName,
        age,
        gender,
        color,
        weight,
        origin,
        description,
        images,
        price,
        quantity,
        typeId,
      });
      await product.save();
      return res.json({ msg: 'Tạo sản phẩm thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   PUT api/products
  // @desc    Update products
  // @access  Private
  async update(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let {
      productName,
      age,
      gender,
      color,
      weight,
      origin,
      description,
      images,
      price,
      quantity,
      typeId,
    } = req.body;
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
      }
      product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            productName,
            age,
            gender,
            color,
            weight,
            origin,
            description,
            images,
            price,
            quantity,
            typeId,
          },
        },
        { new: true }
      );
      return res.json({ msg: 'Cập nhật sản phẩm thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   DELETE api/products/:id
  // @desc    Soft delete products (hide)
  // @access  Private
  async softDelete(req, res) {
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
      }
      await Product.delete({ _id: req.params.id });
      return res.json({ msg: 'Đã xóa sản phẩm thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   PATCH api/products/:id/restore
  // @desc    Restore products has been soft deleted
  // @access  Private
  async restore(req, res) {
    try {
      await Product.restore({ _id: req.params.id });
      return res.json({ msg: 'Khôi phục sản phẩm thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   GET api/products/deleted
  // @desc    Get all products has been soft deleted
  // @access  Private
  async getDeletedProduct(req, res) {
    try {
      let products = await Product.findDeleted({});
      if (products.length === 0) {
        return res.json({ msg: 'Không có sản phẩm nào' });
      }
      return res.json(products);
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }
}

module.exports = new ProductController();
