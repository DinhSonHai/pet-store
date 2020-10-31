const mongoose = require('mongoose');
const dayjs = require('dayjs');
const now = dayjs();

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true, trim: true },
  avatar: { type: String },
  address: [{ value: { type: String, trim: true } }],
  gender: { type: Number, default: 0 },
  dateOfBirth: { type: Date, default: now.toISOString() },
  phoneNumber: { type: String, trim: true },
  resetPasswordLink: {
    data: String,
    default: '',
  },
  role: { type: Number, default: 1 },
  isWorking: { type: Boolean, default: true },
  createdAt: { type: Date, default: now.toISOString() },
});

module.exports = mongoose.model('employee', EmployeeSchema);
