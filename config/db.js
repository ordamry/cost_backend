/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.set('strictQuery', false);
  try {
    const conn = await mongoose.connect("mongodb+srv://admin:<!admin123!>@costmanager.p2x7kgx.mongodb.net/?retryWrites=true&w=majority", {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log(`mongodb connected: ${conn.connection.host}`.cyan.underline)
  } catch (error) {
    console.log(`Error: ${error.message}`.underline.bold)
    process.exit(1)
  }
}

module.exports = {
  connectDB
};
