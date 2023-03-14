/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const mongoose = require("mongoose");

const costSchema = mongoose.Schema(
    {
        category: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Category" },
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        description: { type: String },
        price: { type: Number, required: true, default: 0.0, },
        date: { type: Date, required: true },
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now, required: false },
    }
);

const Cost = mongoose.model("Cost", costSchema);

module.exports = { Cost };