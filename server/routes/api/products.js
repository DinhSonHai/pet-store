const express = require("express");
const router = express.Router();

const ProductController = require("../../app/controllers/ProductController");
const checkPermission = require("../../app/middlewares/checkPermission");
const checkReview = require("../../app/middlewares/checkReview");
const authAdmin = require("../../app/middlewares/authAdmin");

const {
  validateCreateProductInfo,
  validateUpdateProductInfo,
} = require("../../helpers/valid");

// @route   GET api/products/deleted
// @desc    Lấy tất cả sản phẩm đã ẩn đi
// @access  Private
router.get("/deleted", authAdmin, ProductController.getDeleted);

// @route   GET api/products/search
// @desc    Tìm kiếm sản phẩm theo từ khóa
// @access  Public
router.get("/search", ProductController.search);

// @route   GET api/products
// @desc    Lấy tất cả sản phẩm
// @access  Public
router.get("/", authAdmin, ProductController.getAll);

// @route   GET api/products/newest
// @desc    Lấy sản phẩm mới nhất
// @access  Public
router.get("/newest", ProductController.getNewestProducts);

// @route   GET api/products/popular
// @desc    Lấy sản phẩm phổ biến
// @access  Public
router.get("/popular", ProductController.getPopularProducts);

// @route   GET api/products/bestseller
// @desc    Lấy sản phẩm ban chay
// @access  Public
router.get("/bestseller", ProductController.getBestSellerProducts);

// @route   GET api/products/lowquantity
// @desc    Lấy sản phẩm gần hết hàng
// @access  Public
router.get("/lowquantity", authAdmin, ProductController.getLowQuantityProducts);

// @route   GET api/products/:id
// @desc    Lấy sản phẩm theo id
// @access  Public
router.get("/:id", checkReview, ProductController.getById);

// @route   GET api/products/types/:typeId
// @desc    Lấy tất cả sản phẩm theo typeId
// @access  Public
router.get("/types/:typeId", ProductController.getByTypeId);

// @route   GET api/products/types/:typeId/admin
// @desc    Lấy sản phẩm theo typeId cho admin
// @access  Public
router.get('/types/:typeId/admin', ProductController.getProductsByTypeIdForAdmin);

// @route   GET api/products/same-types/:typeId
// @desc    Lấy tất cả sản phẩm theo typeId
// @access  Public
router.get("/same-type/:typeId", ProductController.getSameTypeProducts);

// @route   POST api/products
// @desc    Tạo sản phẩm
// @access  Private
router.post(
  "/",
  [authAdmin, checkPermission, validateCreateProductInfo],
  ProductController.create
);

// @route   PUT api/products/:id
// @desc    Cập nhật sản phẩm
// @access  Private
router.put(
  "/:id",
  [authAdmin, checkPermission, validateUpdateProductInfo],
  ProductController.update
);

// @route   DELETE api/products/:id
// @desc    Xóa mềm
// @access  Private
router.delete(
  "/:id",
  [authAdmin, checkPermission],
  ProductController.softDelete
);

// @route   PATCH api/products/:id/restore
// @desc    Phục hồi sản phẩm đã xóa mềm
// @access  Private
router.patch(
  "/:id/restore",
  [authAdmin, checkPermission],
  ProductController.restore
);

module.exports = router;
