const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const Type = require('../models/Type');
const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('lodash');
const pagination = require('../../helpers/pagination');
const crudService = require('../../services/crud');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').crud;

class ProductController {
  // @route   GET api/products
  // @desc    Lấy tất cả sản phẩm
  // @access  Public
  async getAll(req, res, next) {
    const filterStatus = req.query.sort;
    const { start, end } = pagination(req.query.page, 10);
    const filterValue =
      filterStatus === 'undefined' || !filterStatus
        ? { createdAt: -1 }
        : filterStatus === 'desc'
        ? { price: -1 }
        : { price: 1 };
    try {
      const products = await crudService.getAdvance(Product, {}, filterValue, {
        path: 'typeId',
        select: ['typeName'],
      });
      return res.status(statusCode.success).json({
        data: products.slice(start, end),
        total: products.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/products/:id
  // @desc    Lấy sản phẩm theo id
  // @access  Public
  async getById(req, res, next) {
    try {
      const product = await crudService.getById(Product, req.params.id);
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      return res.status(statusCode.success).json(product);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/products/types/:typeId
  // @desc    Lấy tất cả sản phẩm theo typeId
  // @access  Public
  async getByTypeId(req, res, next) {
    const filterStatus = req.query.sort;
    const typeId = new ObjectId(req.params.typeId);
    const query = { typeId: { $eq: typeId } };
    const { start, end } = pagination(req.query.page, 12);
    const filterValue =
      filterStatus === 'undefined'
        ? { createdAt: -1 }
        : filterStatus === 'desc'
        ? { price: -1 }
        : { price: 1 };
    try {
      const products = await crudService.getAdvance(
        Product,
        query,
        filterValue
      );
      return res.status(statusCode.success).json({
        data: products.slice(start, end),
        total: products.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // // @route   GET api/products/categories/:categoryId
  // // @desc    Lấy tất cả sản phẩm theo categoryId
  // // @access  Public
  // async getByCategoryId(req, res, next) {
  //   try {
  //     //Lấy tất cả loại theo danh mục sản phẩm
  //     const types = await Type.find({
  //       categoryId: new ObjectId(req.params.categoryId),
  //     }).select('_id');
  //     if (!types) {
  //       return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
  //     }
  //     //Lấy ra _id từ Type object
  //     const ids = types.map((type) => type['_id']);
  //     //Lấy tất cả sản phẩm theo danh sách loại sản phẩm
  //     const products = await Product.find().where('typeId').in(ids);
  //     if (!products) {
  //       return res.status(404).json({ msg: 'Sản phẩm không tồn tại' });
  //     }
  //     return res.json(products);
  //   } catch (err) {
  //     console.error(err.message);
  //     return res.status(500).send('Server Error');
  //   }
  // }

  // @route   POST api/products
  // @desc    Tạo sản phẩm
  // @access  Private
  async create(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    let { price, quantity } = req.body;
    try {
      const status = await crudService.create(Product, {
        ...req.body,
        price: parseInt(price),
        quantity: parseInt(quantity),
      });
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.createSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.createFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }

  // @route   PUT api/products
  // @desc    Cập nhật sản phẩm
  // @access  Private
  async update(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    try {
      let product = await crudService.getById(Product, req.params.id);
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.update(product, {
        ...req.body,
        price: parseInt(price),
        quantity: parseInt(quantity),
      });

      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.updateSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.updateFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }

  // @route   DELETE api/products/:id
  // @desc    Xóa mềm
  // @access  Private
  async softDelete(req, res) {
    try {
      let product = await crudService.getById(Product, req.params.id);
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.remove(Product, req.params.id);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.removeSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.removeFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }

  // @route   PATCH api/products/:id/restore
  // @desc    Phục hồi sản phẩm đã xóa mềm
  // @access  Private
  async restore(req, res) {
    try {
      let product = await Product.findDeleted({ _id: req.params.id });
      if (!product) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.restore(Product, req.params.id);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.restoreSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.restoreFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }

  // @route   GET api/products/deleted
  // @desc    Lấy tất cả sản phẩm đã ẩn đi
  // @access  Private
  async getDeleted(req, res) {
    const { start, end } = pagination(req.query.page, 10);
    try {
      let products = await Product.findDeleted();
      return res.status(statusCode.success).json({
        data: products.slice(start, end),
        total: products.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }

  // @route   GET api/products/search
  // @desc    Tìm kiếm sản phẩm theo từ khóa
  // @access  Public
  async search(req, res) {
    let q = req.query.q;
    const filterStatus = req.query.sort;
    const query = { $text: { $search: q }, isShow: true };
    const { start, end } = pagination(req.query.page, 12);
    const filterValue =
      filterStatus === 'undefined'
        ? { createdAt: -1 }
        : filterStatus === 'desc'
        ? { price: -1 }
        : { price: 1 };
    try {
      const products = await crudService.getAdvance(
        Product,
        query,
        filterValue
      );
      return res.status(statusCode.success).json({
        data: products.slice(start, end),
        total: products.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
}

module.exports = new ProductController();
