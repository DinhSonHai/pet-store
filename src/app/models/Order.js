const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  address: { type: String, trim: true },
  total_money: { type: Number },
  status: { type: Number, default: 0 },
  note: { type: String, trim: true },
  created_at: { type: Date, default: now.toISOString() },
  deliveried_at: { type: Date },
});

module.exports = mongoose.model('order', OrderSchema);
