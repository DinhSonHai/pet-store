const Promo = require("../models/Promo");
const crudService = require("../../services/crud");
const statusCode = require("../../constants/statusCode.json");
const message = require("../../constants/message.json").crud;

function getFormattedDataPromo(data) {
  const { discountCondition, discountValue, discountType, name } = data;
  data.name = name.replace(/\s/g, "").toUpperCase();

  const formattedDiscountValue =
    discountType === "percent"
      ? discountValue
      : parseInt(discountValue).toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
  const formattedCurrency = discountType === "percent" ? "%" : "";
  if (discountCondition && discountCondition !== 0) {
    data.descriptions = `Giảm ${formattedDiscountValue}${formattedCurrency} cho đơn từ ${parseInt(
      discountCondition
    ).toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })}`;
  } else {
    data.descriptions = `Giảm ${formattedDiscountValue}${formattedCurrency}`;
  }
  return data;
}

class PromoController {
  // @route   GET api/promos
  // @desc    Lấy tất cả promos
  // @access  Private
  async getAll(req, res, next) {
    try {
      const promos = await crudService.getAll(Promo);
      return res.status(statusCode.success).json(promos);
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   POST api/promos
  // @desc    Tạo promos
  // @access  Private
  async create(req, res, next) {
    try {
      const status = await crudService.create(
        Promo,
        getFormattedDataPromo(req.body)
      );
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

  // @route   PUT api/promos/:id
  // @desc    Cap nhat Promo
  // @access  Private
  async update(req, res, next) {
    try {
      const promo = await crudService.getById(Promo, req.params.id);
      if (!promo) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.update(
        promo,
        getFormattedDataPromo(req.body)
      );
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

  // @route   DELETE api/promos/:id
  // @desc    Xoa Promo
  // @access  Private
  async remove(req, res, next) {
    try {
      const promo = await crudService.getById(Promo, req.params.id);
      if (!promo) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.notFound }] });
      }
      const status = await crudService.remove(Promo, req.params.id);
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

module.exports = new PromoController();
