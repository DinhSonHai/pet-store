const axios = require('axios');
class ClientController {
  // @route   GET /api/client/province
  // @desc    Lấy tỉnh thành
  // @access  Public
  async getProvince(req, res) {
    try {
      const resData = await axios.default.get(
        'https://thongtindoanhnghiep.co/api/city'
      );
      return res.json(resData.data.LtsItem);
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
        `https://thongtindoanhnghiep.co/api/city/${req.params.province_id}/district`
      );
      return res.json(resData.data);
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
        `https://thongtindoanhnghiep.co/api/district/${req.params.ward_id}/ward`
      );
      return res.json(resData.data);
    } catch (err) {
      console.log(err.message);
    }
  }
}
module.exports = new ClientController();
