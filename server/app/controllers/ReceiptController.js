const Receipt = require('../models/Receipt');
const ReceiptDetail = require('../models/ReceiptDetail');
const Product = require('../models/Product');
const ObjectId = require('mongoose').Types.ObjectId;

class ReceiptController {
  // @route   GET api/receipts
  // @desc    Lấy tất cả phiếu nhập
  // @access  Private
  async getAll(req, res) {
    const filterStatus = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const start = (page - 1) * limit;
    const end = page * limit;
    const filterValue =
      filterStatus === 'undefined' || !filterStatus
        ? { createdAt: -1 }
        : { createdAt: -1 };
    try {
      const receipts = await Receipt.find()
        .sort(filterValue)
        .populate({ path: 'employeeId', select: ['name', 'role'] });
      return res.json({
        data: receipts.slice(start, end),
        total: receipts.length,
      });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
  // @route   GET api/receipts/:id
  // @desc    Lấy tất cả phiếu nhập chi tiết theo id phiếu nhập
  // @access  Private
  async getAllDetail(req, res) {
    try {
      const receipts_detail = await ReceiptDetail.find({
        receiptId: new ObjectId(req.params.id),
      });
      return res.json(receipts_detail);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send('Server Error');
    }
  }
  // @route   POST api/receipts
  // @desc    Tạo phiếu nhập
  // @access  Private
  async add(req, res) {
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
          return res.status(404).json({ errors: [{ msg: 'Không tìm thấy!' }] });
        }
        let newQuantity = product.quantity + parseInt(data[i].quantityImport);
        product.price = parseInt(data[i].price);
        if (newQuantity >= 0) {
          product.quantity = newQuantity;
        } else {
          return res.status(400).json({
            errors: [
              {
                msg: 'Số lượng nhập không phù hợp!',
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
      return res.json({
        message: 'Thêm thành công',
      });
    } catch (err) {
      return res.status(400).json({ errors: [{ msg: 'Thêm thất bại!' }] });
    }
  }
}
module.exports = new ReceiptController();
