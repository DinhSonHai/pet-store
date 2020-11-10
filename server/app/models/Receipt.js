const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'employee' },
  note: { type: String, trim: true },
  createdAt: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('receipt', ReceiptSchema);
