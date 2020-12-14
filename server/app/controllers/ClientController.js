const axios = require('axios');
class ClientController {
  // @route   GET /api/client/province
  // @desc    Lấy tỉnh thành
  // @access  Public
  async getProvince(req, res) {
    try {
      const resData = await axios.default.get(
        'https://vapi.vnappmob.com/api/province'
      );
      return res.json(resData.data.results);
    } catch (err) {
      console.log(err.message);
    }
  }

  // @route   GET /api/client/ward/:province_id
  // @desc    Lấy quận huyện theo tỉnh thành
  // @access  Public
  async getWard(req, res) {
    try {
      const resData = await axios.default.get(
        `https://vapi.vnappmob.com/api/province/district/${req.params.province_id}`
      );
      return res.json(resData.data.results);
    } catch (err) {
      console.log(err.message);
    }
  }

  // @route   GET /api/client/town/:ward_id
  // @desc    Lấy xã, thị trấn theo quận huyện
  // @access  Public
  async getTown(req, res) {
    try {
      const resData = await axios.default.get(
        `https://vapi.vnappmob.com/api/province/ward/${req.params.ward_id}`
      );
      return res.json(resData.data.results);
    } catch (err) {
      console.log(err.message);
    }
  }
}
module.exports = new ClientController();
