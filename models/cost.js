/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const mongoose = require("mongoose");
const moment = require("moment");

const costSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Category",
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: { type: String },
  sum: { type: Number, required: true, default: 0.0 },
  date: { type: Date, required: true },
  year: { type: String, required: true },
  month: { type: String, required: true },
  day: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updateAt: { type: Date, default: Date.now, required: false },
});

const Cost = mongoose.model("Cost", costSchema);

module.exports = { Cost };
