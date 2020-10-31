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

  // @route   GET api/products/:id
  // @desc    Get product by id
  // @access  Public
  async getById(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ msg: 'Product not found'})
      }
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = new ProductController();