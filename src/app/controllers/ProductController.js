const Product = require('../models/Product');

class ProductController {
  // @route   GET api/products
  // @desc    Get all products
  // @access  Public
  async index(req, res, next) {
    try {
      const products = await Product.find();
      res.json(products);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = new ProductController();