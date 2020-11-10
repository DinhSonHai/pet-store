const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  productId: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Number },
});

module.exports = mongoose.model('cart', CartSchema);
