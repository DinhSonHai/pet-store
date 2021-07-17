const express = require("express");
const router = express.Router();

const NotificationController = require("../../app/controllers/NotificationController");
const checkPermission = require("../../app/middlewares/checkPermission");
const authAdmin = require("../../app/middlewares/authAdmin");

// @route   GET api/notifications/admin
// @desc    Lấy tất cả notifications phia admin
// @access  Private
router.get(
  "/admin",
  authAdmin,
  NotificationController.getAllByAdmin
);

// @route   GET api/notifications/client
// @desc    Lấy tất cả notifications phia admin
// @access  Private
router.get("/client", NotificationController.getAllByClient);

// @route   POST api/notifications
// @desc    Tạo notification
// @access  Private
router.post("/", [authAdmin, checkPermission], NotificationController.create);

// @route   PUT api/notifications/:id
// @desc    Sửa notification
// @access  Private
router.put("/:id", [authAdmin, checkPermission], NotificationController.update);

// @route   DELETE api/notifications/:id
// @desc    Xoa notification
// @access  Private
router.delete(
  "/:id",
  [authAdmin, checkPermission],
  NotificationController.remove
);

module.exports = router;
