const Type = require('../models/Type');
const ObjectId = require('mongoose').Types.ObjectId; 

class TypeController {
  // @route   GET api/types
  // @desc    Get all types
  // @access  Public
  async index(req, res, next) {
    try {
      const types = await Type.find();
      return res.json(types);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/types/:id
  // @desc    Get type by id
  // @access  Public
  async getById(req, res, next) {
    try {
      const type = await Type.findById(req.params.id);
      if (!type) {
        return res.status(404).json({ msg: 'Type not found'})
      }
      return res.json(type);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/types/categories/:categoryId
  // @desc    Get all types by categoryId
  // @access  Public
  async getByCategoryId(req, res, next) {
    try {
      const types = await Type.find({ categoryId: new ObjectId(req.params.categoryId) });
      if (!types) {
        return res.status(404).json({ msg: 'Types not found'})
      }
      return res.json(types);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new TypeController();