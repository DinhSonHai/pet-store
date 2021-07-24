const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');
const Order = require('../models/Order');
const Review = require('../models/Review');
const User = require('../models/User');
const _ = require('lodash');
const crudService = require('../../services/crud');
const statusCode = require('../../constants/statusCode.json');
const moment = require('moment');

class StatisticalController {
  // @route   GET api/statistical/todayrevenues
  // @desc    Thống kê doanh thu trong ngày hôm nay
  // @access  Private
  async getTodayRevenues(req, res) {
    let today = moment().startOf('day');
    let tomorrow = moment(today).endOf('day');
    try {
      let bill = await crudService.getAll(Bill, {
        deliveriedAt: { $gte: today.toDate(), $lt: tomorrow.toDate() },
      });
      let todayRevenues = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.status(statusCode.success).json({ todayRevenues });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/monthlyrevenues
  // @desc    Thống kê doanh thu theo tháng
  // @access  Admin, Private
  async getMonthlyRevenues(req, res) {
    let today = moment().startOf('month');
    let tomorrow = moment(today).endOf('month');
    try {
      let bill = await crudService.getAll(Bill, {
        deliveriedAt: {
          $gte: today.toDate(),
          $lte: tomorrow.toDate(),
        },
      });
      let monthlyRevenues = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.status(statusCode.success).json({ monthlyRevenues });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/annualrevenues
  // @desc    Thống kê doanh thu theo năm
  // @access  Admin, Private
  async getAnnualRevenues(req, res) {
    let today = moment().startOf('year');
    let tomorrow = moment(today).endOf('year');
    try {
      let bill = await crudService.getAll(Bill, {
        deliveriedAt: {
          $gte: today.toDate(),
          $lte: tomorrow.toDate(),
        },
      });
      let annualRevenues = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.status(statusCode.success).json({ annualRevenues });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/newestorders
  // @desc    Lấy số đơn hàng mới
  // @access  Private
  async getNewestOrders(req, res) {
    try {
      let order = await crudService.getAll(Order, { status: 0 });
      return res.status(statusCode.success).json({ orderCount: order.length });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/newestreviews
  // @desc    Lấy số đánh giá chưa duyệt
  // @access  Private
  async getNewestReviews(req, res) {
    try {
      let review = await crudService.getAll(Review, { status: 0 });
      return res
        .status(statusCode.success)
        .json({ reviewCount: review.length });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/users
  // @desc    Lấy số lượng người dùng
  // @access  Private
  async getUserCount(req, res) {
    try {
      let userCount = await User.estimatedDocumentCount();
      return res.status(statusCode.success).json({ userCount });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/totalbills
  // @desc    Lấy số hóa đơn được bán ra theo thời gian
  // @access  Admin, Private
  async getTotalBills(req, res) {
    let { time } = req.query;
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    if (!time) {
      time = 'day';
    }

    let today = moment().startOf(time);
    let tomorrow = moment(today).endOf(time);

    let sortQuery = {
      'deliveriedAt': { $gte: today.toDate(),  $lt: tomorrow.toDate() }
    };

    if (from && to) {
      let dayStart = new Date(from).toISOString();
      let dayEnd = new Date(to).toISOString();
      sortQuery = { 'deliveriedAt': { $gte: dayStart, $lt: dayEnd } };
    }

    try {
      let bill = await crudService.getAll(Bill, {
        ...sortQuery
      });
      return res.status(statusCode.success).json({ billCount: bill.length });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/totalsales
  // @desc    Lấy số sản phẩm được bán ra theo thời gian
  // @access  Private
  async getTotalSales(req, res) {
    let { time } = req.query;
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    if (!time) {
      time = 'day';
    }

    let today = moment().startOf(time);
    let tomorrow = moment(today).endOf(time);

    let sortQuery = {
      'deliveriedAt': { $gte: today.toDate(),  $lt: tomorrow.toDate() }
    };

    if (from && to) {
      let dayStart = new Date(from).toISOString();
      let dayEnd = new Date(to).toISOString();
      sortQuery = { 'deliveriedAt': { $gte: dayStart, $lt: dayEnd } };
    }

    try {
      let bill = await Bill.find({
        ...sortQuery
      }).select('_id');
      let billIdList = bill.map((item) => item._id);
      let billDetail = await crudService.getAll(BillDetail, {
        billId: { $in: billIdList },
      });
      let productCount = billDetail.reduce((total, current) => {
        return total + current.amount;
      }, 0);
      return res.status(statusCode.success).json({ productCount });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/ordersdatachart/:year
  // @desc    Lấy dữ liệu số đơn được đặt theo tháng
  // @access  Private
  async getOrdersDataChart(req, res) {
    const now = new Date();
    let year = parseInt(req.params.year) || now.getFullYear();
    let ordersArray = [];
    try {
      for (let i = 0; i < 12; i++) {
        let fromDate = new Date(year, i, 1);
        let toDate = new Date(year, i + 1, 0);
        let order = await crudService.getAll(Order, {
          createdAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        });
        ordersArray.push(order.length);
      }
      return res.status(statusCode.success).json(ordersArray);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/revenuesdatachart/:year
  // @desc    Lấy dữ liệu doanh thu theo từng tháng
  // @access  Private
  async getRevenuesDataChart(req, res) {
    const now = new Date();
    let year = parseInt(req.params.year) || now.getFullYear();
    let revenuesArray = [];
    try {
      for (let i = 0; i < 12; i++) {
        let fromDate = new Date(year, i, 1);
        let toDate = new Date(year, i + 1, 0);
        let bill = await crudService.getAll(Bill, {
          deliveriedAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        });
        let monthlyRevenues = bill.reduce((total, current) => {
          return total + current.totalMoney;
        }, 0);
        revenuesArray.push(monthlyRevenues);
      }
      return res.status(statusCode.success).json(revenuesArray);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
}

module.exports = new StatisticalController();
