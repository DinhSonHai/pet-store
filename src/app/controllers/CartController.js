const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Cart = require('../models/Cart');

class CartController {
  // @route   GET api/cart/add
  // @desc    Add product to cart
  // @access  Public
  async addCart(req, res) {
    //Lấy token từ header
    const token = req.header('x-auth-token');
    // Thêm giỏ hàng vào local storage
    try {
      const { productId, quantity } = req.body;
      let cart = new Cart({
        userId: req.user._id,
        productId,
        quantity
      });
      await cart.save();
      return res.json({ msg: 'Thêm vào giỏ hàng thành công'})
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new CartController();
