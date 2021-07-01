const { validationResult } = require("express-validator");
const ObjectId = require('mongoose').Types.ObjectId;

const Product = require("../models/Product");
const DiscountOffer = require("../models/DiscountOffer");
const statusCode = require("../../constants/statusCode.json");
const crudService = require("../../services/crud");
const message = require('../../constants/message.json');
const pagination = require("../../helpers/pagination");

class DiscountOfferController {
  // @route   GET api/discountOffer
  // @desc    Lấy tất cả chương trình khuyến mãi
  // @access  Private
  async getAllDiscountOffers(req, res) {
    const { start, end } = pagination(req.query.page, 6);

    try {
      const offers = await crudService.getAll(DiscountOffer);
      return res.status(statusCode.success).json({
        data: offers.slice(start, end),
        total: offers.length,
      });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/discountOffer/:id
  // @desc    Lấy chương trình khuyến mãi theo id
  // @access  Private
  async getDiscountOfferById(req, res) {
    try {
      const discountOffer = await crudService.getUniqueAdvance(
        DiscountOffer, { _id: new ObjectId(req.params.id) }, {}, {
          path: 'products',
          populate: { path: 'productId' },
        });
      if (!discountOffer) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.crud.notFound }] });
      }
      return res.status(statusCode.success).json(discountOffer);
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   GET api/discountOffer/products
  // @desc    Lấy tất cả sản phẩm trong chương trình khuyến mãi đang hoạt động
  // @access  Public
  async getAllProductsInOffer(req, res) {
    try {
      const discountOffer = await crudService.getUniqueAdvance(DiscountOffer, { isActive: true }, {}, {
        path: 'products',
        populate: { path: 'productId' },
      });
      if (!discountOffer) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.crud.notFound }] });
      }
      if (discountOffer.to <= Date.now()) {
        const offers = await crudService.getAll(DiscountOffer);
        const offersLength = offers.length;
        for (let i = 0; i < offersLength; i++) {
          if (offers[i].isActive) {
            const products = offers[i].products;
            const length = products.length;
            for (let i = 0; i < length; i++) {
              const product = await crudService.getById(Product, products[i].productId);
              if (!product) {
                return res
                  .status(statusCode.notFound)
                  .json({ errors: [{ msg: message.crud.notFound }] });
              }
              product.discountPrice = 0;
              await product.save();
            }
            offers[i].isActive = false;
            await offers[i].save();
          }
        }
      }
      return res.status(statusCode.success).json(discountOffer);
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
    if (from >= to) {
      return res
      .status(statusCode.badRequest)
      .json({ errors: [{ msg: message.discountOffer.invalidDateRange }] });
    }
    try {
      const status = await crudService.create(DiscountOffer, { title, from, to, products: data });
      console.log(status)
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.crud.createSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.crud.createFail }] });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/discountOffer/:id
  // @desc    Cập nhật chương trình khuyến mãi
  // @access  Private Admin
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
    if (from >= to) {
      return res
      .status(statusCode.badRequest)
      .json({ errors: [{ msg: message.discountOffer.invalidDateRange }] });
    }
    try {
      let discountOffer = await crudService.getById(DiscountOffer, req.params.id);
      if (!discountOffer) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.crud.notFound }] });
      }
      if (to <= Date.now()) {
        return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.discountOffer.invalidExpireDate }] });
      }
      if (discountOffer.isActive) {
        if (from >= Date.now()) {
          return res
          .status(statusCode.badRequest)
          .json({ errors: [{ msg: message.discountOffer.invalidStartDate }] });
        }
        const oldData = discountOffer.products;
        const oldDataLength = oldData.length;
        for (let i = 0; i < oldDataLength; i++) {
          const product = await crudService.getById(Product, oldData[i].productId);
          if (!product) {
            return res
              .status(statusCode.notFound)
              .json({ errors: [{ msg: message.crud.notFound }] });
          }
          product.discountPrice = 0;
          await product.save();
        }
        for (let i = 0; i < length; i++) {
          const product = await crudService.getById(Product, data[i].productId);
          if (!product) {
            return res
              .status(statusCode.notFound)
              .json({ errors: [{ msg: message.crud.notFound }] });
          }
          product.discountPrice = product.price * (100 - data[i].discount) / 100;
          await product.save();
        }
      }
      const status = await crudService.update(discountOffer, {
        title, 
        from, 
        to, 
        products: data,
      });
      if (status) {
        return res
          .status(statusCode.success)
          .json({ message: message.crud.updateSuccess });
      }
      return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.crud.updateFail }] });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/discountOffer/:id/activate
  // @desc    Kích hoạt chương trình khuyến mãi
  // @access  Private
  async activeDiscountOffer(req, res) {
    try {
      const discountOffer = await crudService.getById(DiscountOffer, req.params.id);
      if (!discountOffer) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.crud.notFound }] });
      }
      if (Date.parse(discountOffer.from) >= Date.now()) {
        return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.discountOffer.invalidStartDate }] });
      }
      if (Date.parse(discountOffer.to) <= Date.now()) {
        return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.discountOffer.invalidExpireDate }] });
      }
      if (discountOffer.isActive) {
        return res
        .status(statusCode.notFound)
        .json({ errors: [{ msg: message.discountOffer.isActive }] });
      }
      const offers = await crudService.getAll(DiscountOffer);
      const offersLength = offers.length;
      for (let i = 0; i < offersLength; i++) {
        if (offers[i].isActive) {
          const products = offers[i].products;
          const length = products.length;
          for (let i = 0; i < length; i++) {
            const product = await crudService.getById(Product, products[i].productId);
            if (!product) {
              return res
                .status(statusCode.notFound)
                .json({ errors: [{ msg: message.crud.notFound }] });
            }
            product.discountPrice = 0;
            await product.save();
          }
          offers[i].isActive = false;
          await offers[i].save();
        }
      }
      const updateProducts = discountOffer.products;
      const updateLength = updateProducts.length;
      for (let i = 0; i < updateLength; i++) {
        const updateProduct = await crudService.getById(Product, updateProducts[i].productId);
        if (!updateProduct) {
          return res
            .status(statusCode.notFound)
            .json({ errors: [{ msg: message.crud.notFound }] });
        }
        updateProduct.discountPrice = updateProduct.price * (100 - updateProducts[i].discount) / 100;
        await updateProduct.save();
      }
      discountOffer.isActive = true;
      await discountOffer.save();
      return res
        .status(statusCode.success)
        .json({ message: message.discountOffer.activate });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }

  // @route   PUT api/discountOffer/:id/deactivate
  // @desc    Hủy kích hoạt chương trình khuyến mãi
  // @access  Private
  async deactiveDiscountOffer(req, res) {
    try {
      const discountOffer = await crudService.getById(DiscountOffer, req.params.id);
      if (!discountOffer) {
        return res
          .status(statusCode.notFound)
          .json({ errors: [{ msg: message.crud.notFound }] });
      }
      if (!discountOffer.isActive) {
        return res
        .status(statusCode.badRequest)
        .json({ errors: [{ msg: message.discountOffer.isNotActive }] });
      }
      const offers = await crudService.getAll(DiscountOffer);
      const offersLength = offers.length;
      for (let i = 0; i < offersLength; i++) {
        if (offers[i].isActive) {
          const products = offers[i].products;
          const length = products.length;
          for (let i = 0; i < length; i++) {
            const product = await crudService.getById(Product, products[i].productId);
            if (!product) {
              return res
                .status(statusCode.notFound)
                .json({ errors: [{ msg: message.crud.notFound }] });
            }
            product.discountPrice = 0;
            await product.save();
          }
          offers[i].isActive = false;
          await offers[i].save();
        }
      }
      return res
        .status(statusCode.success)
        .json({ message: message.discountOffer.deactivate });
    } catch (error) {
      return res.status(statusCode.serverError).send("Server Error");
    }
  }
}

module.exports = new DiscountOfferController();