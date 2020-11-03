const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Cart = require('../models/Cart');

class CartController {
  // @route   GET api/cart
  // @desc    Lấy tất cả sản phẩm trong giỏ hàng của một người dùng
  // @access  Public
  async index(req, res) {
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

  // @route   POST api/cart/updateCart
  // @desc    Cập nhật số lượng một hoặc nhiều sản phẩm trong giỏ hàng
  // @access  Public
  async updateCart(req, res) {
    // Lấy giỏ hàng
    try {
      let { cart } = req.body;
      cart.forEach(async cartItem => {
        cartItem = await Cart.findOneAndUpdate(
          { userId: req.user._id, productId: cartItem.productId },
          { $set: { quantity: cartItem.quantity }},
          //new: true sẽ trả về đối tượng đã được cập nhật
          { new: true }
        );
        console.log(cartItem)
      })
      return res.json(cart);
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new CartController();
