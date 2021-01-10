const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReceiptDetailSchema = new Schema({
  receiptId: { type: Schema.Types.ObjectId, ref: 'receipt' },
  key: { type: Schema.Types.ObjectId, trim: true },
  productId: { type: Schema.Types.ObjectId, ref: 'product' },
  productName: { type: String, trim: true },
  quantity: { type: Number },
  price: { type: Number },
});

module.exports = mongoose.model('receiptDetail', ReceiptDetailSchema);
