const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Cart = require('../models/Cart');

class CartController {
  // @route   GET api/cart
  // @desc    Lấy tất cả sản phẩm trong giỏ hàng của một người dùng
  // @access  Public
  async index(req, res) {
    //Lấy token từ header
    const token = req.header('x-auth-token');
    // Lấy giỏ hàng
    try {
      const cart = await Cart.find({ userId: req.user._id }).populate('productId', [
        'productName',
        'price'
      ]);
      return res.json(cart);
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/cart/add
  // @desc    Add product to cart
  // @access  Public
  async addCart(req, res) {
    //Lấy token từ header
    const token = req.header('x-auth-token');
    // Thêm vào giỏ hàng
    try {
      let { productId, quantity } = req.body;
      let cart = await Cart.findOne({ userId: req.user._id, productId });
      if(cart) {
        quantity += cart.quantity;
        cart = await Cart.findOneAndUpdate(
          { userId: req.user._id, productId },
          { $set: { quantity }},
          //new: true sẽ trả về đối tượng đã được cập nhật
          { new: true }
        )
      }
      else {
        cart = new Cart({
          userId: req.user._id,
          productId,
          quantity
        });
        await cart.save();
      }
      return res.json({ msg: 'Thêm vào giỏ hàng thành công'})
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new CartController();
