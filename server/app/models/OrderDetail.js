const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'order', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  productName: { type: String, trim: true, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('orderDetail', OrderDetailSchema);
