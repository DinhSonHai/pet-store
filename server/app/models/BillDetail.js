const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BillDetailSchema = new Schema({
  billId: { type: Schema.Types.ObjectId, ref: 'bill', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
  productname: { type: String, trim: true, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('billDetail', BillDetailSchema);
