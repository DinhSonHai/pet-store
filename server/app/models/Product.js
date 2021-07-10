const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  productName: { type: String, required: true, trim: true, text: true },
  description: { type: String, trim: true, default: '' },
  images: [{ type: String, trim: true }],
  price: { type: Number, required: true }, //price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  discountPrice: { type: Number, default: 0 },
  quantity: { type: Number, required: true },
  sold: { type: Number, required: true, default: 0},
  status: { type: Boolean, default: true },
  starRatings: { type: Number, default: 0 },
  starsCount: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  typeId: { type: Schema.Types.ObjectId, ref: 'type' },
  isShow: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date },
});

ProductSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('product', ProductSchema);
