const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: { type: String, trim: true },
  createdAt: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('category', CategorySchema);
