const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: { type: String, default: 'https://firebasestorage.googleapis.com/v0/b/pet-store-ed9d7.appspot.com/o/avatar_03.jpg?alt=media&token=c79e47f3-f578-475a-aba2-ac8cce7cee39' },
  address: [{ value: { type: String, trim: true } }],
  gender: { type: Number, default: 0 },
  dateOfBirth: { type: Date },
  phoneNumber: { type: String, trim: true },
  favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  favoriteProductsCount: { type: Number, default: 0 },
  resetPasswordLink: {
    data: String,
    default: '',
  },
  role: { type: Number, default: 2 },
  createdAt: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('user', UserSchema);
