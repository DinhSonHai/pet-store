const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user' },
  productId: { type: Schema.Types.ObjectId, ref: 'product' },
  starRatings: { type: Number },
  comment: { type: String, trim: true },
  commentedAt: { type: Date, default: now.toISOString() },
  replyComment: [
    {
      userReplyId: { type: Schema.Types.ObjectId, ref: 'user' },
      replyComment: { type: String, trim: true },
      replyCommentedAt: { type: Date, default: now.toISOString() },
    },
  ],
});

module.exports = mongoose.model('review', ReviewSchema);
