const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PromoSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, unique: true,  trim: true },
  descriptions: { type: String, required: true, trim: true },
  discountCondition: { type: Number, default: 0 },
  discountValue: { type: Number, require: true },
  discountType: { type: String, require: true }, // [percent, cash]
  startDate: { type: Date, default: null },
  endDate: { type: Date, default: null },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("promo", PromoSchema);
