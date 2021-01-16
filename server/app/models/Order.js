const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  key: { type: Schema.Types.ObjectId, trim: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  address: { type: String, required: true, trim: true },
  amount: { type: Number, required: true },
  totalMoney: { type: Number, required: true },
  status: { type: Number, default: 0 },
  note: { type: String, trim: true },
  deliveryState: { type: Number, default: 0 },
  paymentState: { type: Number, default: 0 },
  createdAt: { type: Date, default: dayjs().toISOString() },
  confirmedAt: { type: Date, default: null },
  pickedUpAt: { type: Date, default: null },
  packedAt: { type: Date, default: null },
  transportedAt: { type: Date, default: null },
  deliveriedAt: { type: Date, default: null },
});

module.exports = mongoose.model('order', OrderSchema);
