/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        birthday: { type: Date, required: true },
        role: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        updateAt: { type: Date, default: Date.now, required: false },
    }
);

// hash user's password with salt before saving document to db
userSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(Number(process.env.SALT_NUM));
    // const newPW = await bcrypt.hash(password, salt);
    // const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = { User } 