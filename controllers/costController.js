/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const { Cost } = require("../models/cost");

// all cost data get
const getCosts = async (req, res) => {
    const costs = await Cost.find().populate("userId", ["firstname", "lastname"]).populate("category", "name");
    res.status(200).send(costs);
};

// create cost data
const createCost = async (req, res) => {
    const { category, description, price, date } = req.body;
    const { _id } = req.user;
    const cost = Cost({
        category: category,
        userId: _id,
        description: description,
        price: price,
        date: date
    });
    await cost.save();
    res.status(201).send(cost);
};

// update cost data
const updateCost = async (req, res) => {
    const { costId } = req.params;
    const { category, description, price, date } = req.body;
    const { _id } = req.user;
    try {
        const oldCost = await Cost.findById({ _id: costId });
        oldCost.category = category;
        oldCost.userId = _id;
        oldCost.description = description;
        oldCost.price = price;
        oldCost.date = date;
        oldCost.updateAt = Date.now();
        await oldCost.save();

        res.status(200).send({ status: 'success' });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// delete one cost data
const deleteCost = async (req, res) => {
    const { costId } = req.params;
    try {
        await Cost.deleteOne({ _id: costId });

        res.send({ status: 'success' });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
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
            message: error.message
        });
    }
};

module.exports = {
    getCosts,
    createCost,
    updateCost,
    deleteCost,
    getOneCost
}