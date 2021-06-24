const { validationResult } = require("express-validator");

const Product = require("../models/Product");
const DiscountOffer = require("../models/DiscountOffer");
const statusCode = require("../../constants/statusCode.json");
const crudService = require("../../services/crud");
const message = require('../../constants/message.json');

class DiscountOfferController {
  // @route   GET api/discountOffer
  // @desc    Lấy tất cả chương trình khuyến mãi
  // @access  Private
  async getAllDiscountOffers(req, res) {
    try {
      const offers = await crudService.getAll(DiscountOffer);
      return res.json(offers);
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   POST api/discountOffer
  // @desc    Thêm chương trình khuyến mãi
  // @access  Private
  async createDiscountOffer(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { title, data } = req.body;
    const from = parseInt(req.body.from);
    const to = parseInt(req.body.to);
    const length = data.length;
    let productIds = [];
    try {
      for (let i = 0; i < length; i++) {
        const product = await crudService.getById(Product, data[i].id);
        product.discountPrice = product.price * (100 - data[i].discount) / 100;
        await product.save();

        productIds.push(product.id);
      }
      const discountOffer = new DiscountOffer({
        title,
        from,
        to,
        productIds,
      });
      await discountOffer.save();
      return res.status(statusCode.success).json({
        message: message.crud.createSuccess,
      });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/discountOffer/:id
  // @desc    Cập nhật chương trình khuyến mãi
  // @access  Private
  async updateDiscountOffer(req, res) {
    //Kiểm tra req.body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(statusCode.badRequest).json({ errors: errors.array() });
    }
    const { title, data } = req.body;
    const from = parseInt(req.body.from);
    const to = parseInt(req.body.to);
    const length = data.length;
    let productIds = [];
    try {
      let discountOffer = await crudService.getById(DiscountOffer, req.params.id);
      if (!discountOffer) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.crud.notFound }] });
      }
      if (!discountOffer.isActive) {
        return res
        .status(statusCode.notFound)
        .json({ message: message.discountOffer.isNotActive });
      }
      return res.json(discountOffer);
      // for (let i = 0; i < length; i++) {
      //   const product = await crudService.getById(Product, data[i].id);
      //   product.discountPrice = product.price * (100 - data[i].discount) / 100;
      //   await product.save();

      //   productIds.push(product.id);
      // }
      // const discountOffer = new DiscountOffer({
      //   title,
      //   from,
      //   to,
      //   productIds,
      // });
      // await discountOffer.save();
      // return res.status(statusCode.success).json({
      //   message: message.createSuccess,
      // });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   POST api/discountOffer/active
  // @desc    Kích chương trình khuyến mãi
  // @access  Private
  async activeDiscountOffer(req, res) {
    try {
      const offers = await crudService.getAll(DiscountOffer);
      return res.json(offers);
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new DiscountOfferController();