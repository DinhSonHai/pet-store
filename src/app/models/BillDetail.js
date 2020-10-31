const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BillDetailSchema = new Schema({
  billId: { type: Schema.Types.ObjectId, ref: 'bill' },
  productId: { type: Schema.Types.ObjectId, ref: 'product' },
  productname: { type: String, trim: true },
  quantity: { type: Number },
  price: { type: Number },
});

module.exports = mongoose.model('billDetail', BillDetailSchema);
