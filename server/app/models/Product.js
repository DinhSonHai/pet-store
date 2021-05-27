const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  productName: { type: String, required: true, trim: true, text: true },
  age: { type: String, trim: true, default: '' },
  gender: { type: Number, default: 0 },
  color: { type: String, trim: true, default: '' },
  weight: { type: String, trim: true, default: '' },
  origin: { type: String, trim: true, default: '' },
  description: { type: String, trim: true, default: '' },
  images: [{ type: String, trim: true }],
  price: { type: Number, required: true }, //price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  quantity: { type: Number, required: true },
  sold: { type: Number, required: true, default: 0},
  status: { type: Boolean, default: true },
  starRatings: { type: Number, default: 0 },
  starsCount: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  typeId: { type: Schema.Types.ObjectId, ref: 'type' },
  isShow: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date().toISOString() },
  modifiedAt: { type: Date },
});

ProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('product', ProductSchema);
