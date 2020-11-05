const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productName: { type: String, required: true, trim: true },
  age: { type: String, trim: true, default: '' },
  gender: { type: Number, default: 0 },
  color: { type: String, trim: true, default: '' },
  weight: { type: String, trim: true, default: '' },
  origin: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
  images: [{ type: String, trim: true }],
  price: { type: Number, required: true }, //price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  quantity: { type: Number, required: true },
  status: { type: Number, default: 1 },
  starRatings: { type: Number, default: 0 },
  typeId: { type: Schema.Types.ObjectId, ref: 'type' },
  isShow: { type: Boolean, default: true },
  createdAt: { type: Date, default: now.toISOString() },
  modifiedAt: { type: Date },
});

module.exports = mongoose.model('product', ProductSchema);
