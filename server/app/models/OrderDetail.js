const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'order' },
  productId: { type: Schema.Types.ObjectId, ref: 'product' },
  productName: { type: String, trim: true },
  quantity: { type: Number },
  price: { type: Number },
});

module.exports = mongoose.model('orderDetail', OrderDetailSchema);
