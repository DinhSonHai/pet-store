const mongoose = require('mongoose');
const dayjs = require('dayjs');

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
  productId: { type: Schema.Types.ObjectId, ref: 'product' },
  name: { type: String, trim: true },
  avatar: { type: String, trim: true },
  starRatings: { type: Number },
  comment: { type: String, trim: true },
  commentedAt: { type: Date, default: dayjs().toISOString() },
  replyComment: [
    {
      userReplyId: { type: Schema.Types.ObjectId, ref: 'user', default: null },
      adminReplyId: {
        type: Schema.Types.ObjectId,
        ref: 'employee',
        default: null,
      },
      name: { type: String, trim: true },
      avatar: { type: String, trim: true },
      replyComment: { type: String, trim: true },
      replyCommentedAt: { type: Date, default: dayjs().toISOString() },
      status: { type: Number, default: 0 },
    },
  ],
  status: { type: Number, default: 0 },
});

module.exports = mongoose.model('review', ReviewSchema);
