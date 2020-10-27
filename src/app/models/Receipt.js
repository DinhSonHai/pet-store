const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReceiptSchema = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: 'employee' },
    note: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Receipt', ReceiptSchema);