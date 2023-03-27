/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const { Cost } = require("../models/cost");
const moment = require("moment");

// all cost data get
const getCosts = async (req, res) => {
  const costs = await Cost.find()
    .populate("userId", ["first_name", "last_name"])
    .populate("category", "name");
  res.status(200).send(costs);
};

// create cost data
const createCost = async (req, res) => {
  const { category, description, sum, date } = req.body;
  const { _id, id } = req.user;
  const cost = Cost({
    category: category,
    userId: _id,
    user_id: id,
    description: description,
    sum: sum,
    date: date,
    day: moment(date).format("D"),
    month: moment(date).month() + 1,
    year: moment(date).year(),
  });
  await cost.save();
  res.status(201).send(cost);
};

// update cost data
const updateCost = async (req, res) => {
  const { costId } = req.params;
  const { category, description, sum, date } = req.body;
  const { _id, id } = req.user;
  try {
    const oldCost = await Cost.findById({ _id: costId });
    oldCost.category = category;
    oldCost.userId = _id;
    oldCost.user_id = id;
    oldCost.description = description;
    oldCost.sum = sum;
    oldCost.date = date;
    oldCost.day = moment(date).format("D"),
    oldCost.month = moment(date).month() + 1;
    oldCost.year = moment(date).year();
    oldCost.updateAt = Date.now();
    await oldCost.save();

    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// delete one cost data
const deleteCost = async (req, res) => {
  const { costId } = req.params;
  try {
    await Cost.deleteOne({ _id: costId });

    res.send({ status: "success" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

// get one cost data
const getOneCost = async (req, res) => {
  const { costId } = req.params;
  try {
    const cost = await Cost.findById({ _id: costId }, { __v: 0 });

    res.status(200).send(cost);
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getCosts,
  createCost,
  updateCost,
  deleteCost,
  getOneCost,
};
