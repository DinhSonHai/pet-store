const Type = require('../models/Type');
const Category = require('../models/Category');
const ObjectId = require('mongoose').Types.ObjectId;

class TypeController {
  // @route   GET api/types
  // @desc    Lấy tất cả loại sản phẩm
  // @access  Public
  async getAll(req, res, next) {
    try {
      const types = await Type.find().populate({
        path: 'categoryId',
        select: ['categoryName'],
      });
      return res.json(types);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/types/:id
  // @desc    Lấy loại theo id
  // @access  Public
  async getById(req, res, next) {
    try {
      const type = await Type.findById(req.params.id);
      if (!type) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      return res.json(type);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/types/categories/:categoryId
  // @desc   Lấy loại theo danh mục
  // @access  Public
  async getByCategoryId(req, res, next) {
    try {
      const types = await Type.find({
        categoryId: new ObjectId(req.params.categoryId),
      });
      return res.json(types);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/types
  // @desc    Tạo loại sản phẩm
  // @access  Private
  async add(req, res, next) {
    const { typeName, typeImg, categoryId, content } = req.body;
    if (!typeName) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Loại sản phẩm không được trống!' }] });
    }
    if (!typeImg) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Ảnh loại sản phẩm không được trống!' }] });
    }
    const cat = await Category.findById(categoryId);
    if (!cat) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Không tìm thấy danh mục!' }] });
    }
    try {
      const ty = new Type({
        typeName,
        typeImg,
        categoryId,
        content,
      });
      ty.key = ty._id;
      await ty.save((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Thêm thất bại!' }] });
        }
        return res.json({
          message: 'Thêm thành công',
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/types
  // @desc    Sửa loại sản phẩm
  // @access  Private
  async edit(req, res, next) {
    const { typeName, typeImg, categoryId, id, content } = req.body;
    if (!typeName) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Loại sản phẩm không được trống!' }] });
    }
    if (!typeImg) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Ảnh loại sản phẩm không được trống!' }] });
    }
    const cat = await Category.findById(categoryId);
    if (!cat) {
      return res
        .status(404)
        .json({ errors: [{ msg: 'Không tìm thấy danh mục!' }] });
    }
    try {
      const ty = await Type.findById(id);
      if (!ty) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      ty.typeName = typeName;
      ty.typeImg = typeImg;
      ty.categoryId = categoryId;
      ty.content = content;
      await ty.save((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Sửa thất bại!' }] });
        }
        return res.json({
          message: 'Sửa thành công',
        });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   DELETE api/types/:id
  // @desc    Soft delete loại sản phẩm (ẩn đi)
  // @access  Private
  async softDelete(req, res) {
    try {
      let ty = await Type.findById(req.params.id);
      if (!ty) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      await Type.delete({ _id: req.params.id });
      return res.json({ message: 'Xóa thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   PATCH api/types/:id/restore
  // @desc    Phục hồi loại sản phẩm soft deleted
  // @access  Private
  async restore(req, res) {
    try {
      let ty = await Type.findDeleted({ _id: req.params.id });
      if (!ty) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      await Type.restore({ _id: req.params.id });
      return res.json({ message: 'Khôi phục thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   GET api/types/deleted
  // @desc    Lây tất cả loại sản phẩn soft deleted
  // @access  Private
  async getDeleted(req, res) {
    try {
      const ty = await Type.findDeleted({});
      return res.json(ty);
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }
}

module.exports = new TypeController();
