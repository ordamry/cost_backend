/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
module.exports = { generateToken }
