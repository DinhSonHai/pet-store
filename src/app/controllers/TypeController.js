const Type = require('../models/Type');

class TypeController {
  // @route   GET api/types
  // @desc    Get all types
  // @access  Public
  async index(req, res, next) {
    try {
      const types = await Type.find();
      res.json(types);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
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
      res.json(type);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = new TypeController();