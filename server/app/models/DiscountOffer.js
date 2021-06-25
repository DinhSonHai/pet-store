const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DiscountOfferSchema = new Schema({
  title: { type: String, trim: true, required: true },
  from: { type: Date, required: true },
  to: { type: Date, required: true },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'product' },
      discount: { type: Number, required: true },
    },
  ],
  isActive: { type: Boolean, default: false },
});

module.exports = mongoose.model('discountoffer', DiscountOfferSchema);
