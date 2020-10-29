const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  category_name: { type: String, trim: true },
  created_at: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('category', CategorySchema);
