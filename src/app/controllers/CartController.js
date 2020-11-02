const jwt = require('jsonwebtoken');

const User = require('../models/User');
const Cart = require('../models/Cart');

class CartController {
  // @route   GET api/cart/add
  // @desc    Add product to cart
  // @access  Public
  async add(req, res) {
    //Lấy token từ header
    const token = req.header('x-auth-token');
  }
}
