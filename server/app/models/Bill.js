const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Schema = mongoose.Schema;

const BillSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'order', required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  key: { type: Schema.Types.ObjectId, required: true },
  address: { type: String, trim: true, required: true },
  email: { type: String, trim: true },
  totalMoney: { type: Number, required: true },
  status: { type: Number, required: true },
  note: { type: String, trim: true },
  createdAt: { type: Date, default: dayjs().toISOString() },
  deliveriedAt: { type: Date, default: dayjs().toISOString() },
});

module.exports = mongoose.model('bill', BillSchema);
