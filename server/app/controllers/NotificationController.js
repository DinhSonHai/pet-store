const Notification = require("../models/Notification");
const crudService = require("../../services/crud");
const statusCode = require("../../constants/statusCode.json");
const message = require("../../constants/message.json").crud;

class CategoryController {
  // @route   GET api/notifications/admin
  // @desc    Lấy tất cả notifications phia admin
  // @access  Private
  async getAllByAdmin(req, res, next) {
    try {
      const data = await crudService.getAll(Notification);
      return res.status(statusCode.success).json(data);
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/notifications/client
  // @desc    Lấy tất cả notifications phia client
  // @access  Public
  async getAllByClient(req, res, next) {
    try {
      const data = await crudService.getUnique(Notification, {
        isActive: true,
      });
      return res.status(statusCode.success).json(data);
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   POST api/notifications
  // @desc    Tạo notification
  // @access  Private
  async create(req, res, next) {
    const { isActive } = req.body;
    try {
      if (isActive) {
        const found = await crudService.getUnique(Notification, {
          isActive: true,
        });
        if (found) {
          found.isActive = false;
          await found.save();
        }
      }
      const status = await crudService.create(Notification, req.body);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.createSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.createFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/notifications/:id
  // @desc    Sửa notification
  // @access  Private
  async update(req, res, next) {
    const { isActive } = req.body;
    try {
      if (isActive) {
        const found = await crudService.getUnique(Notification, {
          isActive: true,
        });
        if (found) {
          found.isActive = false;
          await found.save();
        }
      }
      const item = await crudService.getById(Notification, req.params.id);
      if (!item) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.update(item, req.body);
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

  // @route   DELETE api/notifications/:id
  // @desc    Xoa notification
  // @access  Private
  async remove(req, res, next) {
    try {
      const item = await crudService.getById(Notification, req.params.id);
      if (!item) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.remove(Notification, req.params.id);
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.removeSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.removeFail }] });
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new CategoryController();
