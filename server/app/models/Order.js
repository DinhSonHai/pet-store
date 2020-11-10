const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  address: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  totalMoney: { type: Number, required: true },
  status: { type: Number, default: 0 },
  note: { type: String, trim: true },
  createdAt: { type: Date, default: now.toISOString() },
  deliveriedAt: { type: Date },
});

module.exports = mongoose.model('order', OrderSchema);
