const Promo = require("../models/Promo");
const User = require("../models/User");
const crudService = require("../../services/crud");
const statusCode = require("../../constants/statusCode.json");
const message = require("../../constants/message.json").crud;
const userMessage = require("../../constants/message.json").user;
const promoMessage = require("../../constants/message.json").promo;

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
  // @route   GET api/promos/admin
  // @desc    Lấy tất cả promos phia admin
  // @access  Private
  async getAllByAdmin(req, res, next) {
    try {
      const promos = await crudService.getAll(Promo);
      return res.status(statusCode.success).json(promos);
    } catch (err) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/promos/client
  // @desc    Lấy tất cả promos phia client
  // @access  Private
  async getAllByClient(req, res, next) {
    try {
      const user = await crudService.getById(User, req.user.id);
      if (!user) {
        return res.status(statusCode.notFound).json({
          errors: [{ msg: userMessage.notFound }],
        });
      }
      const promos = await crudService.getAll(Promo, {
        _id: { $nin: user.promos || [] },
      });
      const mappedPromos = promos.filter((item) => {
        const { endDate } = item;
        return endDate
          ? !(new Date(Date.now()).getTime() >= new Date(endDate).getTime())
          : true;
      });
      return res.status(statusCode.success).json(mappedPromos);
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

  // @route   GET api/promos/apply
  // @desc    Get promo by name
  // @access  Private
  async apply(req, res, next) {
    const { name } = req.query;
    try {
      const [promo, user] = await Promise.all([
        crudService.getUnique(Promo, { name: name?.toUpperCase() }),
        crudService.getById(User, req.user.id),
      ]);
      if (!promo) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: promoMessage.notFound }] });
      }
      if (!user) {
        return res.status(statusCode.notFound).json({
          errors: [{ msg: userMessage.notFound }],
        });
      }
      const { endDate } = promo;
      if (
        endDate &&
        new Date(Date.now()).getTime() >= new Date(endDate).getTime()
      ) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: promoMessage.expiredPromo }] });
      }
      if (user.promos?.includes(promo._id)) {
        return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: promoMessage.alreadyInUse }] });
      }
      return res.status(statusCode.success).json(promo);
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
      const status = await crudService.remove(Promo, req.params.id, true);
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
