const Type = require('../models/Type');
const Category = require('../models/Category');
const ObjectId = require('mongoose').Types.ObjectId;
const message = require('../../constants/message.json').crud;
const crudService = require('../../services/crud');
const statusCode = require('../../constants/statusCode.json');

class TypeController {
  // @route   GET api/types
  // @desc    Lấy tất cả loại sản phẩm
  // @access  Public
  async getAll(req, res, next) {
    try {
      const types = await crudService.getAdvance(
        Type,
        {},
        {},
        {
          path: 'categoryId',
          select: ['categoryName'],
        }
      );
      return res.status(statusCode.success).json(types);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/types/:id
  // @desc    Lấy loại theo id
  // @access  Public
  async getById(req, res, next) {
    try {
      const type = await crudService.getById(Type, req.params.id);
      if (!type) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      return res.status(statusCode.success).json(type);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/types/categories/:categoryId
  // @desc   Lấy loại theo danh mục
  // @access  Public
  async getByCategoryId(req, res, next) {
    try {
      const types = await crudService.getAll(Type, {
        categoryId: new ObjectId(req.params.categoryId),
      });
      return res.status(statusCode.success).json(types);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   POST api/types
  // @desc    Tạo loại sản phẩm
  // @access  Private
  async create(req, res, next) {
    const { typeName, typeImg, categoryId, content } = req.body;
    if (!typeName) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: 'Tên loại sản phẩm không được trống!' }] });
    }
    if (!typeImg) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: 'Ảnh loại sản phẩm không được trống!' }] });
    }
    const cat = await crudService.getById(Category, categoryId);
    if (!cat) {
      return res
        .status(statusCode.notFound)
        .json({ errors: [{ msg: 'Không tìm thấy danh mục!' }] });
    }
    try {
      const status = await crudService.create(Type, req.body);
      if (status) {
        return res.status(statusCode.success).json({
          message: message.createSuccess,
        });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.createFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   PUT api/types/:id
  // @desc    Sửa loại sản phẩm
  // @access  Private
  async update(req, res, next) {
    const { typeName, typeImg, categoryId } = req.body;
    if (!typeName) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: 'Tên loại sản phẩm không được trống!' }] });
    }
    if (!typeImg) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: 'Ảnh loại sản phẩm không được trống!' }] });
    }
    const cat = await crudService.getById(Category, categoryId);
    if (!cat) {
      return res
        .status(statusCode.notFound)
        .json({ errors: [{ msg: 'Không tìm thấy danh mục!' }] });
    }
    try {
      const ty = await crudService.getById(Type, req.params.id);
      if (!ty) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.update(ty, req.body);
      if (status) {
        return res.status(statusCode.success).json({
          message: message.updateSuccess,
        });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.updateFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   DELETE api/types/:id
  // @desc    Soft delete loại sản phẩm (ẩn đi)
  // @access  Private
  async softDelete(req, res) {
    try {
      let ty = await crudService.getById(Type, req.params.id);
      if (!ty) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.remove(Type, req.params.id);
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

  // @route   PATCH api/types/:id/restore
  // @desc    Phục hồi loại sản phẩm soft deleted
  // @access  Private
  async restore(req, res) {
    try {
      let ty = await Type.findDeleted({ _id: req.params.id });
      if (!ty) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.restore(Type, req.params.id);
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

  // @route   GET api/types/deleted
  // @desc    Lây tất cả loại sản phẩn soft deleted
  // @access  Private
  async getDeleted(req, res) {
    try {
      const ty = await Type.findDeleted({});
      return res.status(statusCode.success).json(ty);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server error');
    }
  }
}

module.exports = new TypeController();
