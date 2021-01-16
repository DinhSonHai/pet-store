
const Bill = require('../models/Bill');
const Order = require('../models/Order');
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

  // @route   GET api/statistical/newestorders
  // @desc    Lấy số đơn hàng mới
  // @access  Private
  async getNewestOrders(req, res) {
    try {
      let order = await Order.find({ status: 0 });
      if (!order) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Chưa có đơn hàng nào mới đặt!' }] });
      }
      return res.json({ orderCount: order.length });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new StatisticalController();