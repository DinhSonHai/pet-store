
const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');
const Order = require('../models/Order');
const Review = require('../models/Review');
const _ = require('lodash');

class StatisticalController {

  // @route   GET api/statistical/todayrevenues
  // @desc    Thống kê doanh thu trong ngày hôm nay
  // @access  Private
  async getTodayRevenues(req, res) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    try {
      let bill = await Bill.find({ deliveriedAt: { $gte: today } });
      if (!bill) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Doanh thu hôm nay vẫn chưa có!' }] });
      }
      let todayRevenues = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.json({ todayRevenues });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/monthlyrevenues
  // @desc    Thống kê doanh thu theo tháng
  // @access  Admin, Private
  async getMonthlyRevenues(req, res) {
    const now = new Date();
    const fromDate = new Date(now.getFullYear(), now.getMonth(), 1);
    const toDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    try {
      let bill = await Bill.find({ 
        deliveriedAt: {
          '$gte': fromDate, '$lte': toDate
        }});
      if (!bill) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Doanh thu tháng này vẫn chưa có!' }] });
      }
      let monthlyRevenues = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.json({ monthlyRevenues });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/annualrevenues
  // @desc    Thống kê doanh thu theo năm
  // @access  Admin, Private
  async getAnnualRevenues(req, res) {
    const now = new Date();
    const fromDate = new Date(now.getFullYear(), 0, 1);
    console.log(fromDate)
    const toDate = new Date(now.getFullYear() + 1, 0, 0);
    try {
      let bill = await Bill.find({ 
        deliveriedAt: {
          '$gte': fromDate, '$lte': toDate
      }});
      if (!bill) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Doanh thu năm này vẫn chưa có!' }] });
      }
      let annualRevenues = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.json({ annualRevenues });
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

  // @route   GET api/statistical/newestreviews
  // @desc    Lấy số đánh giá mới
  // @access  Private
  async getNewestReviews(req, res) {
    try {
      let review = await Review.find({ status: 0 });
      if (!review) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Chưa có đánh giá mới nào!' }] });
      }
      return res.json({ reviewCount: review.length });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/newestcomments
  // @desc    Lấy số bình luận mới
  // @access  Private
  async getNewestComments(req, res) {
    try {
      let review = await Review.find();
      if (!review) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Chưa có đánh giá mới nào!' }] });
      }
      let commentCount = review.reduce((total, current) => {
        let comment = current.replyComment
        let newestComment = comment.filter(cmt => cmt.status === 0);
        return total + newestComment.length;
      }, 0);
      return res.json({ commentCount });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/todaybills
  // @desc    Lấy số hóa đơn được bán ra trong ngày hôm nay
  // @access  Private
  async getTodayBills(req, res) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    try {
      let bill = await Bill.find({ deliveriedAt: { $gte: today } });
      if (!bill) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Doanh thu hôm nay vẫn chưa có!' }] });
      }

      return res.json({ billCount: bill.length });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/todaysales
  // @desc    Lấy số sản phẩm được bán ra trong ngày hôm nay
  // @access  Private
  async getTodaySales(req, res) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    try {
      let bill = await Bill.find({ deliveriedAt: { $gte: today } }).select('_id');
      if (!bill) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Doanh thu hôm nay vẫn chưa có!' }] });
      }
      let billIdList = bill.map(item => item._id);
      let billDetail = await BillDetail.find({ billId: { $in: billIdList }});

      let productCount = billDetail.reduce((total, current) => {
        return total + current.amount;
      }, 0);
      return res.json({ productCount });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}

module.exports = new StatisticalController();