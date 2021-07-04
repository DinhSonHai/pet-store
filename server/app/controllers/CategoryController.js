const Category = require('../models/Category');
const crudService = require('../../services/crud');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').crud;

class CategoryController {
  // @route   GET api/categories
  // @desc    Lấy tất cả danh mục
  // @access  Public
  async getAll(req, res, next) {
    try {
      const categories = await crudService.getAdvance(Category, {}, { createdAt: 'desc' });
      return res.status(statusCode.success).json(categories);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // @route   GET api/categories/:id
  // @desc    Lấy danh mục theo id
  // @access  Public
  async getById(req, res, next) {
    try {
      const cat = await crudService.getById(Category, req.params.id);
      if (!cat) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      return res.json(cat);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   POST api/categories
  // @desc    Tạo danh mục
  // @access  Private
  async create(req, res, next) {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: 'Tên danh mục không được trống!' }] });
    }
    try {
      const status = await crudService.create(Category, req.body);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.createSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.createFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/categories/:id
  // @desc    Sửa danh mục
  // @access  Private
  async update(req, res, next) {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: 'Danh mục không được trống!' }] });
    }
    try {
      const cat = await crudService.getById(Category, req.params.id);
      if (!cat) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.update(cat, req.body);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ data, message: message.updateSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.updateFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   DELETE api/categories/:id
  // @desc    Soft delete danh mục (ẩn đi)
  // @access  Private
  async softDelete(req, res) {
    try {
      let cat = await crudService.getById(Category, req.params.id);
      if (!cat) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.remove(Category, req.params.id);
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

  // @route   PATCH api/categories/:id/restore
  // @desc    Phục hồi danh mục soft deleted
  // @access  Private
  async restore(req, res) {
    try {
      let cat = await Category.findDeleted({ _id: req.params.id });
      if (!cat) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.restore(Category, req.params.id);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.restoreSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.restoreFail }] });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   GET api/categories/deleted
  // @desc    Lây tất cả danh mục soft deleted
  // @access  Private
  async getDeleted(req, res) {
    try {
      const cat = await Category.findDeleted({});
      return res.status(statusCode.success).json(cat);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }
}

module.exports = new CategoryController();
