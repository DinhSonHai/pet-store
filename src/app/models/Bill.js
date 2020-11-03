const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const BillSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'order' },
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  address: { type: String, trim: true },
  email: { type: String, trim: true },
  totalMoney: { type: Number },
  status: { type: Number },
  note: { type: String, trim: true },
  createdAt: { type: Date, default: now.toISOString() },
  deliveriedAt: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('bill', BillSchema);
