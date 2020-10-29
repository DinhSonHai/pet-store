const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  user_id: { type: Schema.Types.ObjectId, ref: 'user' },
  product_id: { type: Schema.Types.ObjectId, ref: 'product' },
  star_ratings: { type: Number },
  comment: { type: String, trim: true },
  commented_at: { type: Date, default: now.toISOString() },
  reply_comment: [
    {
      user_reply_id: { type: Schema.Types.ObjectId, ref: 'user' },
      reply_comment: { type: String, trim: true },
      reply_commented_at: { type: Date, default: now.toISOString() },
    },
  ],
});

module.exports = mongoose.model('review', ReviewSchema);
