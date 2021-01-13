const mongoose = require('mongoose');
const dayjs = require('dayjs');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: {
    type: String,
    default:
      'https://firebasestorage.googleapis.com/v0/b/pet-store-ed9d7.appspot.com/o/avatar_03.jpg?alt=media&token=c79e47f3-f578-475a-aba2-ac8cce7cee39',
    trim: true,
  },
  address: { type: String, trim: true, default: '' },
  gender: { type: Number, default: 0 },
  dateOfBirth: { type: Date, default: dayjs().toISOString() },
  phoneNumber: { type: String, trim: true },
  resetPasswordLink: {
    data: String,
    default: '',
  },
  role: { type: Number, default: 1 },
  isWorking: { type: Boolean, default: true },
  createdAt: { type: Date, default: dayjs().toISOString() },
});
EmployeeSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
module.exports = mongoose.model('employee', EmployeeSchema);
