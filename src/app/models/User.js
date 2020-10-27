const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String },
    address: { type: Array },
    gender: { type: Number, default: 0},
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'product'}],
    favoriteProductsCount: { type: Number, default: 0 },
    resetPasswordLink: {
      data: String,
      default: '',
    },
    role: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);