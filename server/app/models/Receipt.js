const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'employee' },
  key: { type: Schema.Types.ObjectId, trim: true },
  note: { type: String, trim: true },
  createdAt: { type: Date, default: dayjs().toISOString() },
});

module.exports = mongoose.model('receipt', ReceiptSchema);
