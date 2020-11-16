const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: { type: String, trim: true },
  createdAt: { type: Date, default: now.toISOString() },
});

CategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('category', CategorySchema);
