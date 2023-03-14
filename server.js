/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
var express = require('express');
require('dotenv').config()
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const { connectDB } = require("./config/db");

//routes
const userRoute = require("./routes/userRoute.js");
const costRoute = require("./routes/costRoute.js");
const categoryRoute = require("./routes/categoryRoute.js");
const reportRoute = require("./routes/reportRoute.js");

const app = express();

// Connect Database
connectDB();

app.use(express.json());
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

app.use("/api/users", userRoute);
app.use("/api/costs", costRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/report", reportRoute);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        colors.yellow.bold(`Server running on port http://localhost:${PORT}`)
    )
)