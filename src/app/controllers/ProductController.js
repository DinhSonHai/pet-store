const Product = require('../models/Product');
const ObjectId = require('mongoose').Types.ObjectId; 

class ProductController {
  // @route   GET api/products
  // @desc    Get all products
  // @access  Public
  async index(req, res, next) {
    try {
      const products = await Product.find();
      if (!products) {
        return res.status(404).json({ msg: 'Products not found'})
      }
      return res.json(products);
    } catch (err) {
      console.error(err.message);
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
        return res.status(404).json({ msg: 'Product not found'})
      }
      return res.json(product);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/types/:typeId
  // @desc    Get all products by typeId
  // @access  Public
  async getByTypeId(req, res, next) {
    try {
      const products = await Product.find({ typeId: new ObjectId(req.params.typeId) });
      if (!products) {
        return res.status(404).json({ msg: 'Products not found'})
      }
      return res.json(products);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new ProductController();