/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const { Cost } = require("../models/cost");
const ObjectId = require("mongoose").Types.ObjectId;
const moment = require('moment');
const { User } = require("../models/user");

const getReport = async (req, res) => {
  const { userId, year, month } = req.query;
  let startOfMonth;
  let endOfMonth;
  if (year && month) {
    const selectedDate = year + "-" + month + "-" + "01";
    startOfMonth = moment(selectedDate, "YYYY-MM-DD").startOf('month');
    endOfMonth = moment(selectedDate, "YYYY-MM-DD").endOf('month');
  } else {
    startOfMonth = '';
    endOfMonth = '';
  }
  let report;
  let user;
  try {
    if (userId !== "") {
      user = await User.find({ id: userId }).limit(1);
      if (startOfMonth !== "" && endOfMonth !== "") {
        report = await Cost.aggregate([
          {
            $match: {
              user_id: new ObjectId(user[0]._id),
              date: { $gte: new Date(startOfMonth), $lte: new Date(endOfMonth) },
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "result",
            },
          },
          {
            $sort: { date: -1 },
          },
          {
            $group: {
              _id: "$category",
              category: {
                $push: {
                  category: "$result",
                  description: "$description",
                  day: "$day",
                  sum: { $sum: "$sum" },
                },
              },
            },
          },
        ]);
      } else {
        report = await Cost.aggregate([
          {
            $match: { user_id: new ObjectId(user[0]._id) },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "result",
            },
          },
          {
            $sort: { date: -1 },
          },
          {
            $group: {
              _id: "$category",
              category: {
                $push: {
                  category: "$result",
                  description: "$description",
                  day: "$day",
                  sum: { $sum: "$sum" },
                },
              },
            },
          },
        ]);
      }
    } else {
      if (startOfMonth !== "" && endOfMonth !== "") {
        report = await Cost.aggregate([
          {
            $match: {
              date: { $gte: new Date(startOfMonth), $lte: new Date(endOfMonth) },
            },
          },
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "result",
            },
          },
          {
            $sort: { date: -1 },
          },
          {
            $group: {
              _id: "$category",
              category: {
                $push: {
                  category: "$result",
                  description: "$description",
                  day: "$day",
                  sum: { $sum: "$sum" },
                },
              },
            },
          },
        ]);
      } else {
        report = await Cost.aggregate([
          {
            $lookup: {
              from: "categories",
              localField: "category",
              foreignField: "_id",
              as: "result",
            },
          },

          {
            $sort: { date: -1 },
          },
          {
            $group: {
              _id: "$category",
              category: {
                $push: {
                  category: "$result",
                  description: "$description",
                  day: "$day",
                  sum: { $sum: "$sum" },
                },
              },
            },
          },
        ]);
      }
    }
    let reportDocument = {};
    for (let reportOne of report) {
      let categoryName = "";
      categoryName = reportOne.category[0].category[0].name;
      reportDocument[`${categoryName}`] = [];
      for (var categorysecond of reportOne.category) {
        let subCategory = {};
        subCategory.day = categorysecond.day;
        subCategory.description = categorysecond.description;
        subCategory.sum = categorysecond.sum;
        reportDocument[`${categoryName}`].push(subCategory);
      }
    }

    res.status(200).send(reportDocument);
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getReport,
};
