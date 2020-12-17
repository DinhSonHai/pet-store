const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true, required: true },
  address: { type: String, required: true, trim: true },
  totalMoney: { type: Number, required: true },
  status: { type: Number, default: 0 },
  note: { type: String, trim: true },
  deliveryState: { type: Number, default: 0 },
  paymentState: { type: Number, default: 0 },
  createdAt: { type: Date, default: now.toISOString() },
  deliveriedAt: { type: Date, default: null },
});

module.exports = mongoose.model('order', OrderSchema);
