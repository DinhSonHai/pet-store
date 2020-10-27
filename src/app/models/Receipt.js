const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ReceiptSchema = new Schema(
  {
    employee_id: { type: Schema.Types.ObjectId, required: true },
    note: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', ReceiptSchema);