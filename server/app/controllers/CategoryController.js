const Category = require('../models/Category');

class CategoryController {
  // @route   GET api/categories
  // @desc    Get all categories
  // @access  Public
  async index(req, res, next) {
    try {
      const categories = await Category.find();
      return res.json(categories);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/categories/:id
  // @desc    Get category by id
  // @access  Public
  async getById(req, res, next) {
    try {
      const type = await Category.findById(req.params.id);
      if (!type) {
        return res.status(404).json({ msg: 'Category not found'})
      }
      return res.json(type);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new CategoryController();