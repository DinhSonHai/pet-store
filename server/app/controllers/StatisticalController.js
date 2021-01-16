
const Bill = require('../models/Bill');
const _ = require('lodash');

class StatisticalController {

  // @route   GET api/statistical/dailysales
  // @desc    Thống kê doanh thu theo ngày
  // @access  Private
  async getDailySales(req, res) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    try {
      let bill = await Bill.find({ deliveriedAt: { $gte: today } });
      if (!bill) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Doanh thu hôm nay vẫn chưa có!' }] });
      }
      let dailySales = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.json({ dailySales });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new StatisticalController();