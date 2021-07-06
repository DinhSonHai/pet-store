const ObjectId = require('mongoose').Types.ObjectId;
const moment = require('moment');

const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');
const pagination = require('../../helpers/pagination');
const crudService = require('../../services/crud');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').crud;
class BillController {
  // @route   GET api/bills
  // @desc    Lấy tất cả hóa đơn
  // @access  Private
  async getAll(req, res) {
    const { sort } = req.query;
    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    let dayStart = moment().startOf('day');
    let dayEnd = moment().endOf('day');

    let sortQuery = {};

    if (sort) {
      if (sort === 'today') {
        dayStart = new Date(dayStart).toISOString();
        dayEnd = new Date(dayEnd).toISOString();
        sortQuery = { 'deliveriedAt': { $gte: dayStart, $lt: dayEnd } };
      }
    }
    if (from && to) {
      dayStart = new Date(from).toISOString();
      dayEnd = new Date(to).toISOString();
      sortQuery = { 'deliveriedAt': { $gte: dayStart, $lt: dayEnd } };
    }

    const { start, end } = pagination(req.query.page, 10);

    try {
      const bills = await crudService.getAdvance(Bill, { ...sortQuery }, { 'deliveriedAt': 'desc' });
      return res
        .status(statusCode.success)
        .json({ data: bills.slice(start, end), total: bills.length });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/bills/:id
  // @desc    Lấy hóa đơn theo id
  // @access  Private
  async getById(req, res) {
    try {
      const bill = await crudService.getById(Bill, req.params.id);
      if (!bill) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      return res.status(statusCode.success).json(bill);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/bills/detail/:id
  // @desc    Lấy tất cả chi tiết hóa đơn theo id hóa đơn
  // @access  Private
  async getBillsDetail(req, res) {
    try {
      const detail = await crudService.getAll(BillDetail, {
        billId: new ObjectId(req.params.id),
      });
      return res.status(statusCode.success).json(detail);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }

  // @route   GET api/bills/invoice/:id
  // @desc    Lấy dữ liệu in hóa đơn
  // @access  Private
  async invoice(req, res) {
    try {
      const [order, detail] = await Promise.all([
        crudService.getById(Bill, req.params.id),
        crudService.getAll(BillDetail, {
          billId: new ObjectId(req.params.id),
        }),
      ]);
      if (!order) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      return res.status(statusCode.success).json({ order, detail });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
}
module.exports = new BillController();
