const express = require("express");
const router = express.Router();

const DiscountOfferController = require("../../app/controllers/DiscountOfferController");
const authAdmin = require("../../app/middlewares/authAdmin");

// @route   POST api/discountOffer
// @desc    Thêm chương trình khuyến mãi
// @access  Private
router.post("/", authAdmin, DiscountOfferController.createDiscountOffer);

module.exports = router;
