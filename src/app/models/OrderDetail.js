const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'order' },
  product_id: { type: Schema.Types.ObjectId, ref: 'product' },
  product_name: { type: String, trim: true },
  quantity: { type: Number },
  price: { type: Number },
});

module.exports = mongoose.model('orderDetail', OrderDetailSchema);
