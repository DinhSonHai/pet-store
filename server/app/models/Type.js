const mongoose = require('mongoose');
const dayjs = require('dayjs');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const TypeSchema = new Schema({
  typeName: { type: String, trim: true, required: true },
  key: { type: Schema.Types.ObjectId, required: true },
  typeImg: { type: String, trim: true },
  content: { type: String, trim: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'category', required: true },
  createdAt: { type: Date, default: dayjs().toISOString() },
});

TypeSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('type', TypeSchema);
