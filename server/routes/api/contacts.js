const express = require("express");
const router = express.Router();

const ContactController = require("../../app/controllers/ContactController");
const checkPermission = require("../../app/middlewares/checkPermission");
const authAdmin = require("../../app/middlewares/authAdmin");

// @route   PUT api/contacts/:id
// @desc    Cap nhat contact
// @access  Private
router.put("/:id", authAdmin, ContactController.update);

// @route   GET api/contacts
// @desc    Lấy tất cả contacts
// @access  Private
router.get("/", authAdmin, ContactController.getAll);

// @route   POST api/contacts
// @desc    Tạo contact
// @access  Public
router.post("/", ContactController.create);


module.exports = router;
