const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Schema = mongoose.Schema;

const BillSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'order', default: null },
  userId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  key: { type: Schema.Types.ObjectId, required: true },
  address: { type: String, trim: true, required: true },
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: { type: String, trim: true },
  totalMoney: { type: Number, required: true },
  status: { type: Boolean, default: true },
  note: { type: String, trim: true },
  orderedAt: { type: Date, default: dayjs().toISOString() },
  deliveriedAt: { type: Date, default: dayjs().toISOString() },
});

module.exports = mongoose.model('bill', BillSchema);
