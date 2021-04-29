const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReceiptSchema = new Schema({
  employeeId: { type: Schema.Types.ObjectId, ref: 'employee' },
  key: { type: Schema.Types.ObjectId, trim: true },
  note: { type: String, trim: true },
  createdAt: { type: Date, default: new Date().toISOString() },
});

module.exports = mongoose.model('receipt', ReceiptSchema);
