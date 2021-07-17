const express = require("express");
const router = express.Router();

const PromoController = require("../../app/controllers/PromoController");
const checkPermission = require("../../app/middlewares/checkPermission");
const authAdmin = require("../../app/middlewares/authAdmin");
const auth = require("../../app/middlewares/auth");

// @route   GET api/promos
// @desc    Lấy tất cả promos phia client
// @access  Private
router.get("/client", auth, PromoController.getAllByClient);

// @route   GET api/promos/admin
// @desc    Lấy tất cả promos phia admin
// @access  Private
router.get("/admin", authAdmin, PromoController.getAllByAdmin);

// @route   GET api/promos/apply
// @desc    Lấy promos by name
// @access  Private
router.get("/apply", auth, PromoController.apply);

// @route   POST api/promos
// @desc    Tạo promo
// @access  Private
router.post("/", [authAdmin, checkPermission], PromoController.create);

// @route   PUT api/promos/:id
// @desc    Sửa promo
// @access  Private
router.put("/:id", [authAdmin, checkPermission], PromoController.update);

// @route   DELETE api/promos/:id
// @desc   Xoa promo
// @access  Private
router.delete("/:id", [authAdmin, checkPermission], PromoController.remove);

module.exports = router;
