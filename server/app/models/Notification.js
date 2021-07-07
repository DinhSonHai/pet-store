const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true, trim: true },
  descriptions: { type: String, required: true, trim: true },
  banner: { type: String, required: true, trim: true },
  isActive: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notification", NotificationSchema);
