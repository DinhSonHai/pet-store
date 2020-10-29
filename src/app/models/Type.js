const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  type_name: { type: String, trim: true },
  category_id: { type: Schema.Types.ObjectId, ref: 'category' },
  created_at: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('type', TypeSchema);
