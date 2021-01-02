const Category = require('../models/Category');

class CategoryController {
  // @route   GET api/categories
  // @desc    Lấy tất cả danh mục
  // @access  Public
  async getAll(req, res, next) {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
  // @route   GET api/categories/:id
  // @desc    Lấy danh mục theo id
  // @access  Public
  async getById(req, res, next) {
    try {
      const cat = await Category.findById(req.params.id);
      if (!cat) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      return res.json(cat);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   POST api/categories
  // @desc    Tạo danh mục
  // @access  Private
  async Add(req, res, next) {
    const { categoryName } = req.body;
    if (!categoryName) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Danh mục không được trống!' }] });
    }
    try {
      const cat = new Category({
        categoryName,
      });
      cat.key = cat._id;
      await cat.save((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Thêm thất bại!' }] });
        }
        return res.json({ data, message: 'Thêm thành công' });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   PUT api/categories
  // @desc    Sửa danh mục
  // @access  Private
  async editById(req, res, next) {
    const { id, categoryName } = req.body;
    if (!categoryName) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Danh mục không được trống!' }] });
    }
    try {
      const cat = await Category.findById(id);
      if (!cat) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      cat.categoryName = categoryName;
      await cat.save((err, data) => {
        if (err) {
          return res.status(400).json({ errors: [{ msg: 'Sửa thất bại!' }] });
        }
        return res.json({ data, message: 'Sửa thành công' });
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   DELETE api/categories/:id
  // @desc    Soft delete danh mục (ẩn đi)
  // @access  Private
  async softDelete(req, res) {
    try {
      let cat = await Category.findById(req.params.id);
      if (!cat) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      await Category.delete({ _id: req.params.id });
      return res.json({ message: 'Xóa thành công' });
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }

  // @route   PATCH api/categories/:id/restore
  // @desc    Phục hồi danh mục soft deleted
  // @access  Private
  async restore(req, res) {
    try {
      let cat = await Category.findDeleted({ _id: req.params.id });
      if (!cat) {
        return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
      }
      await Category.restore({ _id: req.params.id });
      return res.json({ message: 'Khôi phục thành công' });
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
      return res.json(cat);
    } catch (error) {
      return res.status(500).send('Server error');
    }
  }
}

module.exports = new CategoryController();
