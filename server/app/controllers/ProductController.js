const { validationResult } = require('express-validator');

const Product = require('../models/Product');
const Type = require('../models/Type');
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');

class ProductController {
  // @route   GET api/products
  // @desc    Lấy tất cả sản phẩm
  // @access  Public
  async getAll(req, res, next) {
    const filterStatus = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const start = (page - 1) * limit;
    const end = page * limit;
    const filterValue =
      filterStatus === 'undefined' || !filterStatus
        ? { createdAt: -1 }
        : filterStatus === 'desc'
        ? { price: -1 }
        : { price: 1 };
    try {
      const products = await Product.find()
        .sort(filterValue)
        .populate({
          path: 'typeId',
          select: ['typeName'],
        });
      return res.json({
        data: products.slice(start, end),
        total: products.length,
      });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/:id
  // @desc    Lấy sản phẩm theo id
  // @access  Public
  async getById(req, res, next) {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy sản phẩm!' }] });
      }
      return res.json(product);
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/products/types/:typeId
  // @desc    Lấy tất cả sản phẩm theo typeId
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
  // @route   GET api/products/categories/:categoryId
  // @desc    Lấy tất cả sản phẩm theo categoryId
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
  // @desc    Tạo sản phẩm
  // @access  Private
  async add(req, res) {
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
      isShow,
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
        price: parseInt(price),
        quantity: parseInt(quantity),
        typeId,
        isShow,
      });
      product.key = product._id;
      await product.save((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Thêm thất bại!' }] });
        }
      });
      return res.json({ message: 'Thêm thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   PUT api/products
  // @desc    Cập nhật sản phẩm
  // @access  Private
  async edit(req, res) {
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
      status,
      id,
      isShow,
    } = req.body;

    try {
      let product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      const productFields = {
        productName,
        age,
        gender,
        color,
        weight,
        origin,
        description,
        images,
        price: parseInt(price),
        quantity: parseInt(quantity),
        status,
        typeId,
        isShow,
      };
      product = _.extend(product, productFields);
      await product.save((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Sửa thất bại!' }] });
        }
        return res.json({
          message: 'Sửa thành công',
        });
      });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   DELETE api/products/:id
  // @desc    Xóa mềm
  // @access  Private
  async softDelete(req, res) {
    try {
      let product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      await Product.delete({ _id: req.params.id });
      return res.json({ message: 'Xóa thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   PATCH api/products/:id/restore
  // @desc    Phục hồi sản phẩm đã xóa mềm
  // @access  Private
  async restore(req, res) {
    try {
      let p = await Product.findDeleted({ _id: req.params.id });
      if (!p) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      await Product.restore({ _id: req.params.id });
      return res.json({ message: 'Khôi phục thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   GET api/products/deleted
  // @desc    Lấy tất cả sản phẩm đã ẩn đi
  // @access  Private
  async getDeleted(req, res) {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const start = (page - 1) * limit;
    const end = page * limit;
    try {
      let products = await Product.findDeleted();
      return res.json({
        data: products.slice(start, end),
        total: products.length,
      });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   GET api/products/search
  // @desc    Tìm kiếm sản phẩm theo từ khóa
  // @access  Public
  async search(req, res) {
    let q = req.query.q;
    const filterStatus = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const query = { $text: { $search: q }, isShow: true };
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
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new ProductController();
