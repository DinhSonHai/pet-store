const User = require("../models/User");
const Order = require("../models/Order");
const crudService = require("../../services/crud");
const statusCode = require("../../constants/statusCode.json");
const message = require("../../constants/message.json").user;
const ObjectId = require("mongoose").Types.ObjectId;
const pagination = require("../../helpers/pagination");

class CustomerController {
  // @route   GET api/customers
  // @desc    Lấy tất cả khách hàng
  // @access  Private
  async getAll(req, res, next) {
    const q = req.query.q;
    let queryValues = {};
    if (q) {
      const searchTerms = new RegExp(q, "i");
      queryValues = {
        $or: [
          { name: searchTerms },
          { email: searchTerms },
          { phoneNumber: searchTerms },
        ],
      };
    }
    const { start, end } = pagination(req.query.page, 10);
    try {
      const users = await crudService.getAdvance(User, queryValues, {
        createdAt: "desc",
      });
      return res.status(statusCode.success).json({
        data: users.slice(start, end),
        total: users.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/customers/:id
  // @desc    Lấy số lượng đơn hàng đang xử lý, đã hoàn tất, đã hủy
  // @access  Private
  async getDetail(req, res, next) {
    const user = await crudService.getById(User, req.params.id);
    if (!user) {
      return res.status(statusCode.notFound).json({
        errors: [{ msg: message.notFound }],
      });
    }
    const userId = new ObjectId(req.params.id);
    try {
      const [processingCount, completeCount, cancelCount] = await Promise.all([
        Order.countDocuments({
          userId,
          status: { $nin: [-1, 5] },
        }),
        Order.countDocuments({ userId, status: 5 }),
        Order.countDocuments({ userId, status: -1 }),
      ]);
      return res.status(statusCode.success).json({
        processingCount,
        completeCount,
        cancelCount,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new CustomerController();
