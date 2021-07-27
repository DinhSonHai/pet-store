const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');
const Order = require('../models/Order');
const Review = require('../models/Review');
const User = require('../models/User');
const Product = require('../models/Product');
const _ = require('lodash');
const crudService = require('../../services/crud');
const statusCode = require('../../constants/statusCode.json');
const moment = require('moment');

class StatisticalController {
  // @route   GET api/statistical/totalrevenues
  // @desc    Thống kê doanh thu theo thời gian
  // @access  Admin, Private
  async getTotalRevenues(req, res) {
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
        ...sortQuery,
      });
      let totalRevenues = bill.reduce((total, current) => {
        return total + current.totalMoney;
      }, 0);
      return res.status(statusCode.success).json({ totalRevenues });
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
  // @desc    Lấy số hóa đơn hoàn thành theo thời gian
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
      const billCount = await Bill.countDocuments({...sortQuery});
      return res.status(statusCode.success).json({ billCount });
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

  // @route   GET api/statistical/bestsellers
  // @desc    Lấy top 3 sản phẩm bán chạy theo thời gian
  // @access  Private
  async getBestSellers(req, res) {
    let { time } = req.query;
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    if (!time) {
      time = 'year';
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
      let billDetail = await crudService.getAdvance(BillDetail, {
        billId: { $in: billIdList }
      }, {}, {});
      const productIdList = billDetail.map(({ productId, amount }) => ({ _id: productId, amount }));
      const counts = productIdList.reduce((acc, value) => {
        if (!value || !value._id || !value.amount) {
          return { ...acc };
        }
        return {
          ...acc,
          [value._id]: (acc[value._id] || 0) + value.amount
        }
      }, {});

      const keysSorted = Object.keys(counts).sort(( a, b ) => counts[b] - counts[a]);
      const newProductIdList = keysSorted.slice(0, 3);
      let productList = await crudService.getAll(Product, {
        _id: { $in: newProductIdList },
      });
      const products = productList.map(({ _id, productName, images }) => ({ _id, productName, image: images[0], sold: counts[_id] })).sort(( a, b ) => b.sold - a.sold);
      return res.status(statusCode.success).json({ products });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/ordersdatachart/:year
  // @desc    Lấy dữ liệu số đơn được đặt theo năm
  // @access  Private
  async getOrdersDataChart(req, res) {
    const now = new Date();
    let year = parseInt(req.params.year) || now.getFullYear();
    let ordersArray = [];
    try {
      for (let i = 0; i < 12; i++) {
        let fromDate = new Date(year, i, 1);
        let toDate = new Date(year, i + 1, 0);
        let order = await Order.countDocuments({
          createdAt: {
            $gte: fromDate,
            $lte: toDate,
          },
        })
        ordersArray.push(order);
      }
      return res.status(statusCode.success).json(ordersArray);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/statistical/revenuesdatachart/:year
  // @desc    Lấy dữ liệu doanh thu theo từng năm
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
