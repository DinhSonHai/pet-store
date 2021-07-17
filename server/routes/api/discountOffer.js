const express = require("express");
const router = express.Router();

const DiscountOfferController = require("../../app/controllers/DiscountOfferController");
const authAdmin = require("../../app/middlewares/authAdmin");
const checkPermission = require("../../app/middlewares/checkPermission");

const {
  validateCreateDiscountOffer,
} = require("../../helpers/valid");

// @route   GET api/discountOffer
// @desc    Lấy tất cả chương trình khuyến mãi
// @access  Private
router.get("/", authAdmin, DiscountOfferController.getAllDiscountOffers);

// @route   POST api/discountOffer
// @desc    Thêm chương trình khuyến mãi
// @access  Private
router.post("/", [authAdmin, checkPermission, validateCreateDiscountOffer], DiscountOfferController.createDiscountOffer);

// @route   GET api/discountOffer/products
// @desc    Lấy tất cả sản phẩm trong chương trình khuyến mãi đang hoạt động
// @access  Public
router.get("/products", DiscountOfferController.getAllProductsInOffer);

// @route   PUT api/discountOffer/:id/activate
// @desc    Kích hoạt chương trình khuyến mãi
// @access  Private
router.put("/:id/activate", [authAdmin, checkPermission], DiscountOfferController.activeDiscountOffer);

// @route   PUT api/discountOffer/:id/deactivate
// @desc    Hủy kích hoạt chương trình khuyến mãi
// @access  Private
router.put("/:id/deactivate", [authAdmin, checkPermission], DiscountOfferController.deactiveDiscountOffer);

// @route   GET api/discountOffer/:id
// @desc    Lấy chương trình khuyến mãi theo id
// @access  Private
router.get("/:id", authAdmin, DiscountOfferController.getDiscountOfferById);

// @route   PUT api/discountOffer/:id
// @desc    Cập nhật chương trình khuyến mãi
// @access  Private
router.put("/:id", [authAdmin, checkPermission, validateCreateDiscountOffer], DiscountOfferController.updateDiscountOffer);

// @route   DELETE api/discountOffer/:id
// @desc    Xóa chương trình khuyến mãi theo id
// @access  Private
router.delete("/:id", [authAdmin, checkPermission], DiscountOfferController.deleteDiscountOfferById);

module.exports = router;
