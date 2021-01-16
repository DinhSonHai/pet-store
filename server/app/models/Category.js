const mongoose = require('mongoose');
const dayjs = require('dayjs');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  categoryName: { type: String, trim: true, required: true },
  key: { type: Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: dayjs().toISOString() },
});

CategorySchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('category', CategorySchema);
