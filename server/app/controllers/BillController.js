process.env['NODE_CONFIG_DIR'] = __dirname;
const ObjectId = require('mongoose').Types.ObjectId;
const Bill = require('../models/Bill');
const BillDetail = require('../models/BillDetail');
class BillController {
  // @route   GET api/bills
  // @desc    Lấy tất cả hóa đơn
  // @access  Private
  async getAll(req, res) {
    const filterStatus = req.query.sort;
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const start = (page - 1) * limit;
    const end = page * limit;
    const filterValue =
      filterStatus === 'undefined' || !filterStatus
        ? { orderedAt: -1 }
        : { orderedAt: -1 };
    try {
      const bills = await Bill.find().sort(filterValue);
      return res.json({ data: bills.slice(start, end), total: bills.length });
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/bills/:id
  // @desc    Lấy hóa đơn theo id
  // @access  Private
  async getById(req, res) {
    try {
      const bill = await Bill.findById(req.params.id);
      if (!bill) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Không tìm thấy hóa đơn!' }] });
      }
      return res.json(bill);
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/bills/detail/:id
  // @desc    Lấy tất cả chi tiết hóa đơn theo id hóa đơn
  // @access  Private
  async getBillsDetail(req, res) {
    try {
      const detail = await BillDetail.find({
        billId: new ObjectId(req.params.id),
      });
      return res.json(detail);
    } catch (error) {
      return res.status(500).send('Server Error');
    }
  }

  // @route   GET api/bills/invoice/:id
  // @desc    Lấy dữ liệu in hóa đơn
  // @access  Private
  async invoice(req, res) {
    try {
      const order = await Bill.findById(req.params.id);
      if (!order) {
        return res.status(404).json({
          errors: [
            {
              msg: 'Không tìm thấy hóa đơn!',
            },
          ],
        });
      }
      const detail = await BillDetail.find({
        billId: new ObjectId(req.params.id),
      });
      return res.json({ order, detail });
    } catch (err) {
      return res.status(500).send('Server Error');
    }
  }
}
module.exports = new BillController();
