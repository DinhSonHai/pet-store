const Receipt = require('../models/Receipt');
const ReceiptDetail = require('../models/ReceiptDetail');
const Product = require('../models/Product');
const ObjectId = require('mongoose').Types.ObjectId;
const pagination = require('../../helpers/pagination');
const statusCode = require('../../constants/statusCode.json');
const message = require('../../constants/message.json').crud;
const crudService = require('../../services/crud');
class ReceiptController {
  // @route   GET api/receipts
  // @desc    Lấy tất cả phiếu nhập
  // @access  Private
  async getAll(req, res) {
    const filterStatus = req.query.sort;
    const { start, end } = pagination(req.query.page, 10);
    const filterValue =
      filterStatus === 'undefined' || !filterStatus
        ? { createdAt: -1 }
        : { createdAt: -1 };
    try {
      const receipts = await crudService.getAdvance(Receipt, {}, filterValue, {
        path: 'employeeId',
        select: ['name', 'role'],
      });
      return res.status(statusCode.success).json({
        data: receipts.slice(start, end),
        total: receipts.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // @route   GET api/receipts/:id
  // @desc    Lấy tất cả phiếu nhập chi tiết theo id phiếu nhập
  // @access  Private
  async getAllDetail(req, res) {
    try {
      const receipts_detail = await crudService.getAll(ReceiptDetail, {
        receiptId: new ObjectId(req.params.id),
      });
      return res.status(statusCode.success).json(receipts_detail);
    } catch (err) {
      return res.status(statusCode.serverError).send('Server Error');
    }
  }
  // @route   POST api/receipts
  // @desc    Tạo phiếu nhập
  // @access  Private
  async create(req, res) {
    const { data, note } = req.body;
    try {
      let receipt = new Receipt({
        employeeId: req.user.id,
        note,
      });
      receipt.key = receipt._id;
      receipt = await receipt.save();
      let length = data.length;
      for (let i = 0; i < length; ++i) {
        let product = await Product.findById(data[i].key);
        if (!product) {
          return res
            .status(statusCode.notFound)
            .json({ errors: [{ msg: message.notFound }] });
        }
        let newQuantity = product.quantity + parseInt(data[i].quantityImport);
        product.price = parseInt(data[i].price);
        if (newQuantity >= 0) {
          product.quantity = newQuantity;
        } else {
          return res.status(400).json({
            errors: [
              {
                msg: message.error,
              },
            ],
          });
        }
        let detail = new ReceiptDetail({
          receiptId: receipt._id,
          productId: data[i].key,
          productName: data[i].productName,
          quantity: parseInt(data[i].quantityImport),
          price: parseInt(data[i].price),
        });
        detail.key = detail._id;
        await product.save();
        await detail.save();
      }
      return res.status(statusCode.success).json({
        message: message.createSuccess,
      });
    } catch (err) {
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.createFail }] });
    }
  }
}
module.exports = new ReceiptController();
