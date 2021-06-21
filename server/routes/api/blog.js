const express = require("express");
const router = express.Router();

const BlogController = require("../../app/controllers/BlogController");
const checkPermission = require("../../app/middlewares/checkPermission");
const authAdmin = require("../../app/middlewares/authAdmin");

// @route   GET api/blogs
// @desc    Lấy tất cả blogs
// @access  Public
router.get("/", BlogController.getAll);

// @route   GET api/blogs/tags
// @desc    Lấy blog theo tags
// @access  Public
router.get("/tags", BlogController.getByTags);

// @route   GET api/blogs/newest
// @desc    Lấy blog moi nhat
// @access  Public
router.get("/newest", BlogController.getByNewest);

// @route   GET api/blogs/search
// @desc    Tìm kiếm blog theo từ khóa
// @access  Public
router.get("/search", BlogController.search);

// @route   POST api/blogs
// @desc    Tạo blog
// @access  Private
router.post("/", [authAdmin, checkPermission], BlogController.create);

// @route   PUT api/blogs/:id
// @desc    Sửa blog
// @access  Private
router.put("/:id", [authAdmin, checkPermission], BlogController.update);

// @route  DELETE api/blogs/:id
// @desc    Xoa blog
// @access  Private
router.delete("/:id", [authAdmin, checkPermission], BlogController.remove);

// @route   GET api/blogs/:id
// @desc    Lấy blog theo id
// @access  Public
router.get("/:id", BlogController.getById);

module.exports = router;
