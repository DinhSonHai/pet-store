const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');
const Order = require('../models/Order');
const Review = require('../models/Review');
const _ = require('lodash');
const moment = require('moment');

class StatisticalController {
  // @route   GET api/statistical/todayrevenues
  // @desc    Thống kê doanh thu trong ngày hôm nay
  // @access  Private
  async getTodayRevenues(req, res) {
    let today = moment().startOf('day');
    let tomorrow = moment(today).endOf('day');
    try {
      let bill = await Bill.find({
        deliveriedAt: { $gte: today.toDate(), $lt: tomorrow.toDate() },
      });
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
    let today = moment().startOf('month');
    let tomorrow = moment(today).endOf('month');
    try {
      let bill = await Bill.find({
        deliveriedAt: {
          $gte: today.toDate(),
          $lte: tomorrow.toDate(),
        },
      });
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
    let today = moment().startOf('year');
    let tomorrow = moment(today).endOf('year');
    try {
      let bill = await Bill.find({
        deliveriedAt: {
          $gte: today.toDate(),
          $lte: tomorrow.toDate(),
        },
      });
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
      return res.json({ orderCount: order.length });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/newestreviews
  // @desc    Lấy số đánh giá chưa duyệt
  // @access  Private
  async getNewestReviews(req, res) {
    try {
      let review = await Review.find({ status: 0 });
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
      let review = await Review.find({ status: 1 });
      let commentCount = review.reduce((total, current) => {
        let comment = current.replyComment;
        let newestComment = comment.filter((cmt) => cmt.status === 0);
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
    let today = moment().startOf('day');
    try {
      let bill = await Bill.find({ deliveriedAt: { $gte: today.toDate() } });
      return res.json({ billCount: bill.length });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/todaysales
  // @desc    Lấy số sản phẩm được bán ra trong ngày hôm nay
  // @access  Private
  async getTodaySales(req, res) {
    let today = moment().startOf('day');
    try {
      let bill = await Bill.find({
        deliveriedAt: { $gte: today.toDate() },
      }).select('_id');
      let billIdList = bill.map((item) => item._id);
      let billDetail = await BillDetail.find({ billId: { $in: billIdList } });

      let productCount = billDetail.reduce((total, current) => {
        return total + current.amount;
      }, 0);
      return res.json({ productCount });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/statistical/ordersdatachart/:year
  // @desc    Lấy dữ liệu số đơn được đặt theo tháng
  // @access  Private
  async getOrdersDataChart(req, res) {
    const now = new Date();
    let year = parseInt(req.params.year) || now.getFullYear();
    let ordersArray = [];
    for (let i = 0; i < 12; i++) {
      let fromDate = new Date(year, i, 1);
      let toDate = new Date(year, i + 1, 0);
      try {
        let order = await Order.find({
          createdAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        });
        ordersArray.push(order.length);
      } catch (err) {
        return res.status(500).send('Server Error');
      }
    }
    return res.json(ordersArray);
  }

  // @route   GET api/statistical/revenuesdatachart/:year
  // @desc    Lấy dữ liệu doanh thu theo từng tháng
  // @access  Private
  async getRevenuesDataChart(req, res) {
    const now = new Date();
    let year = parseInt(req.params.year) || now.getFullYear();
    let revenuesArray = [];
    for (let i = 0; i < 12; i++) {
      let fromDate = new Date(year, i, 1);
      let toDate = new Date(year, i + 1, 0);
      try {
        let bill = await Bill.find({
          deliveriedAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        });
        let monthlyRevenues = bill.reduce((total, current) => {
          return total + current.totalMoney;
        }, 0);
        revenuesArray.push(monthlyRevenues);
      } catch (err) {
        return res.status(500).send('Server Error');
      }
    }
    return res.json(revenuesArray);
  }
}

module.exports = new StatisticalController();
