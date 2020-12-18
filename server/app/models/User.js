const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();
const mongooseDelete = require('mongoose-delete');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: {
    type: String,
    default:
      'https://firebasestorage.googleapis.com/v0/b/pet-store-ed9d7.appspot.com/o/avatar_03.jpg?alt=media&token=c79e47f3-f578-475a-aba2-ac8cce7cee39',
  },
  address: [
    {
      id: { type: mongoose.Schema.ObjectId },
      value: { type: String, trim: true },
      isDefault: { type: Boolean, default: false },
      p_id: { type: Number },
      w_id: { type: Number },
      t_id: { type: Number },
      m: { type: String, trim: true },
    },
  ],
  gender: { type: Number, default: 0 },
  dateOfBirth: { type: Date, default: now.toISOString() },
  phoneNumber: {
    type: String,
    trim: true,
    default: '',
  },
  favoriteProducts: [{ type: Schema.Types.ObjectId, ref: 'product' }],
  resetPasswordLink: {
    type: String,
    default: '',
  },
  role: { type: Number, default: 2 },
  createdAt: { type: Date, default: now.toISOString() },
});

UserSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});
UserSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('user', UserSchema);
