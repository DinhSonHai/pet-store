const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CartSchema = new Schema({
  userid: { type: Schema.Types.ObjectId, ref: 'user' },
  productid: { type: Schema.Types.ObjectId, ref: 'product' },
  quantity: { type: Number },
});

module.exports = mongoose.model('cart', CartSchema);
