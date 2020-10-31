const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  typeName: { type: String, trim: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'category' },
  createdAt: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('type', TypeSchema);
