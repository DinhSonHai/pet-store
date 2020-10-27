const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReceiptDetailSchema = new Schema(
  {
    receiptId: { type: Schema.Types.ObjectId, ref: 'receipt' },
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    productName: { type: String },
    quantity: { type: Number },
    price: { type: Number },
  }
);

module.exports = mongoose.model('ReceiptDetail', ReceiptDetailSchema);