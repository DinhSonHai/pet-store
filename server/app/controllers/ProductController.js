const { validationResult } = require('express-validator');

const Product = require('../models/Product');
const Type = require('../models/Type');
const ObjectId = require('mongoose').Types.ObjectId;

class ProductController {
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
    try {
      let filterStatus = req.query.sort;
      let products = [];
      if (filterStatus) {
        if (filterStatus === 'desc') {
          products = await Product.find({
            typeId: new ObjectId(req.params.typeId),
          }).sort({ price: 'desc' });
        } else if (filterStatus === 'asc') {
          products = await Product.find({
            typeId: new ObjectId(req.params.typeId),
          }).sort({ price: 'asc' });
        } else {
          products = await Product.find({
            typeId: new ObjectId(req.params.typeId),
          });
        }
      } else {
        products = await Product.find({
          typeId: new ObjectId(req.params.typeId),
        });
      }
      // const products = await Product.find({ typeId: new ObjectId(req.params.typeId) });
      if (!products) {
        return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
      }
      return res.json(products);
    } catch (err) {
      console.error(err.message);
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
