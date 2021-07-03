const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  email: { type: String, required: true, trim: true },
  name: { type: String, required: true, trim: true },
  message: { type: String,  required: true, trim: true },
  status: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now},
  confirmedAt: { type: Date, default: null },
});

module.exports = mongoose.model("contact", ContactSchema);
