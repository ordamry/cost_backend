/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const { Cost } = require("../models/cost");
const ObjectId = require('mongoose').Types.ObjectId

const getReport = async (req, res) => {
    const { userId, startDate, endDate } = req.query;
    let report;
    try {
        if (userId !== "") {
            if (startDate !== "" && endDate !== "") {
                report = await Cost.aggregate(
                    [
                        {
                            $match: { userId: new ObjectId(userId), date: { $gte: new Date(startDate), $lte: new Date(endDate) } }
                        },
                        {
                            $lookup: {
                                from: 'categories',
                                localField: 'category',
                                foreignField: '_id',
                                as: 'result',
                            }
                        },
                        { 
                            $sort: { "date": -1 } 
                        },
                        {
                            $group: {
                                _id: "$category",
                                category: { $push: { category: '$result',  description: '$description', date: '$date', sum: '$price' } },
                            },
                        },
                    ]
                )
            } else {
                report = await Cost.aggregate(
                    [
                        {
                            $match: { userId: new ObjectId(userId) }
                        },
                        {
                            $lookup: {
                                from: 'categories',
                                localField: 'category',
                                foreignField: '_id',
                                as: 'result',
                            }
                        },
                        { 
                            $sort: { "date": -1 } 
                        },
                        {
                            $group: {
                                _id: "$category",
                                category: { $push: { category: '$result',  description: '$description', date: '$date', sum: '$price' } },
                            },
                        },
                    ]
                )
            }
            
        } else {
            if (startDate !== "" && endDate !== "") {
                
                report = await Cost.aggregate(
                    [
                        {
                            $match: { date: { $gte: new Date(startDate), $lte: new Date(endDate) } }
                        },
                        {
                            $lookup: {
                                from: 'categories',
                                localField: 'category',
                                foreignField: '_id',
                                as: 'result',
                            }
                        },
                        { 
                            $sort: { "date": -1 } 
                        },
                        {
                            $group: {
                                _id: "$category",
                                category: { $push: { category: '$result',  description: '$description', date: '$date', sum: '$price' } },
                            },
                        },
                    ]
                )
            } else {
                
                report = await Cost.aggregate(
                    [
                        {
                            $lookup: {
                                from: 'categories',
                                localField: 'category',
                                foreignField: '_id',
                                as: 'result',
                            }
                        },
                        
                        { 
                            $sort: { "date": -1 } 
                        },
                        {
                            $group: {
                                _id: "$category",
                                category: { $push: { category: '$result',  description: '$description', date: '$date', sum: '$price' } },
                            },
                        },
                    ]
                )
            }
        }
        let reportDocument = {};
        for (let reportOne of report) {
            let categoryName = "";
            categoryName = reportOne.category[0].category[0].name
            subCategory = {}
            for (var categorysecond of reportOne.category) {
                subCategory.day = categorysecond.date.toISOString().split('T')[0];
                subCategory.description = categorysecond.description;
                subCategory.sum = categorysecond.sum;
                subCategory.user = categorysecond.sum;
            }
            reportDocument[`${categoryName}`] = [];
            reportDocument[`${categoryName}`].push(subCategory);
        }

        res.status(200).send(reportDocument);

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

module.exports = {
    getReport
}