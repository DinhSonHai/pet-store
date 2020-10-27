const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true },
    avatar: { type: String },
    address: { type: Array },
    gender: { type: Number, default: 0},
    dateOfBirth: { type: Date },
    phoneNumber: { type: String },
    resetPasswordLink: {
      data: String,
      default: '',
    },
    role: { type: Number },
    isWorking: { type: Boolean },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Employee', EmployeeSchema);