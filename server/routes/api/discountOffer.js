const express = require("express");
const router = express.Router();

const DiscountOfferController = require("../../app/controllers/DiscountOfferController");
const authAdmin = require("../../app/middlewares/authAdmin");

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
router.post("/", [authAdmin, validateCreateDiscountOffer], DiscountOfferController.createDiscountOffer);

// @route   GET api/discountOffer/products
// @desc    Lấy tất cả sản phẩm trong chương trình khuyến mãi đang hoạt động
// @access  Public
router.get("/products", DiscountOfferController.getAllProductsInOffer);

// @route   PUT api/discountOffer/:id/activate
// @desc    Kích hoạt chương trình khuyến mãi
// @access  Private
router.put("/:id/activate", authAdmin, DiscountOfferController.activeDiscountOffer);

// @route   PUT api/discountOffer/:id/deactivate
// @desc    Hủy kích hoạt chương trình khuyến mãi
// @access  Private
router.put("/:id/deactivate", authAdmin, DiscountOfferController.deactiveDiscountOffer);

// @route   GET api/discountOffer/:id
// @desc    Lấy chương trình khuyến mãi theo id
// @access  Private
router.get("/:id", authAdmin, DiscountOfferController.getDiscountOfferById);

// @route   PUT api/discountOffer/:id
// @desc    Cập nhật chương trình khuyến mãi
// @access  Private
router.put("/:id", [authAdmin, validateCreateDiscountOffer], DiscountOfferController.updateDiscountOffer);

module.exports = router;
