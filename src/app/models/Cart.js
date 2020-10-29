const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  product_id: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Number },
});

module.exports = mongoose.model('cart', CartSchema);
