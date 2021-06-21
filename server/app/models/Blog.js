const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const date = new Date().toISOString();

const BlogSchema = new Schema({
  key: { type: Schema.Types.ObjectId, required: true },
  employeeId: { type: Schema.Types.ObjectId, ref: "employee", required: true },
  title: { type: String, trim: true },
  content: { type: String, trim: true },
  thumbnail: { type: String, trim: true },
  tags: [{ type: String, trim: true }],
  createdAt: { type: Date, default: date},
});

module.exports = mongoose.model("blog", BlogSchema);
