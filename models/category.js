/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now, required: false },
    }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = { Category };