const Contact = require("../models/Contact");
const crudService = require("../../services/crud");
const statusCode = require("../../constants/statusCode.json");
const message = require("../../constants/message.json").crud;
const pagination = require("../../helpers/pagination");

class ContactController {
  // @route   GET api/contacts
  // @desc    Lấy tất cả contact
  // @access  Private
  async getAll(req, res, next) {
    const { start, end } = pagination(req.query.page, 10);
    try {
      const contacts = await crudService.getAdvance(Contact, {}, { createdAt: 'desc' });
      return res.status(statusCode.success).json({
        data: contacts.slice(start, end),
        total: contacts.length,
      });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   POST api/contacts
  // @desc    Tạo contact
  // @access  Private
  async create(req, res, next) {
    try {
      const status = await crudService.create(Contact, req.body);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.sendSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.sendFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/contacts/:id
  // @desc    Cap nhat contact
  // @access  Private
  async update(req, res, next) {
    try {
      const contact = await crudService.getById(Contact, req.params.id);
      if (!contact) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.update(contact, {
        status: true,
        confirmedAt: new Date(),
      });
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.updateSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.updateFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new ContactController();
