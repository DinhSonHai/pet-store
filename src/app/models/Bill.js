const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const BillSchema = new Schema({
  order_id: { type: Schema.Types.ObjectId, ref: 'order' },
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  address: { type: String, trim: true },
  total_money: { type: Number },
  status: { type: Number },
  note: { type: String, trim: true },
  created_at: { type: Date },
  deliveried_at: { type: Date },
});

module.exports = mongoose.model('bill', BillSchema);
