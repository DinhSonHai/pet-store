const Product = require("../models/Product");
const DiscountOffer = require("../models/DiscountOffer");
const statusCode = require("../../constants/statusCode.json");
const crudService = require("../../services/crud");
const message = require('../../constants/message.json').crud;

class DiscountOfferController {
  async createDiscountOffer(req, res) {
    const { title, data } = req.body;
    const from = parseInt(req.body.from);
    const to = parseInt(req.body.to);
    const length = data.length;
    let productIds = [];
    try {
      for (let i = 0; i < length; i++) {
        const product = await crudService.getById(Product, data[i]._id);
        product.discountPrice = product.price * (100 - data[i].discount) / 100;
        await product.save();

        productIds.push(product._id);
      }
      const discountOffer = new DiscountOffer({
        title,
        from,
        to,
        productIds,
      });
      await discountOffer.save();
      return res.status(statusCode.success).json({
        message: message.createSuccess,
      });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new DiscountOfferController();