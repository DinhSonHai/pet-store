const { validationResult } = require('express-validator');

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
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại'})
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
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại'})
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
    try {
      const products = await Product.find({ typeId: new ObjectId(req.params.typeId) });
      if (!products) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại'})
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

    let { productName, age, gender, color, weight, origin, description, images, price, quantity, typeId } = req.body;
    try{
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
        typeId
      });
      await product.save();
      return res.json({ msg: 'Tạo sản phẩm thành công' });
    } catch(error) {
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
    let { productName, age, gender, color, weight, origin, description, images, price, quantity, typeId } = req.body;
    try{
      let product = await Product.findById(req.params.id);
      if(!product) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại'})
      }
      product = await Product.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { productName, age, gender, color, weight, origin, description, images, price, quantity, typeId } },
        { new: true},
      );
      return res.json({ msg: 'Cập nhật sản phẩm thành công' });
    } catch(error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   DELETE api/products/:id
  // @desc    Soft delete products (hide)
  // @access  Private
  async softDelete(req, res) {
    try {
      let product = await Product.findById(req.params.id);
      if(!product) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại'})
      }
      await Product.delete({ _id: req.params.id });
      return res.json({ msg: 'Đã xóa sản phẩm thành công' });
    } catch(error) {
      return res.status(500).send('Server error');
    }
  }
}

module.exports = new ProductController();