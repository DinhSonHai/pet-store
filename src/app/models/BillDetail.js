const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BillDetailSchema = new Schema({
  bill_id: { type: Schema.Types.ObjectId, ref: 'bill' },
  product_id: { type: Schema.Types.ObjectId, ref: 'product' },
  product_name: { type: String, trim: true },
  quantity: { type: Number },
  price: { type: Number },
});

module.exports = mongoose.model('billDetail', BillDetailSchema);
