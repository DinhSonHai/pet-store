const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BillDetailSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  billId: { type: Schema.Types.ObjectId, ref: 'bill', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  productName: { type: String, trim: true, required: true },
  amount: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('billDetail', BillDetailSchema);
