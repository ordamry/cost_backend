/*
Submitted by:
Or damri - 316441088
Idit oksman - 207379769
*/
const { Category } = require("../models/category");

// all category data get
const getCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(200).send(categories);
};

// create category data
const createCategory = async (req, res) => {
    const { name, description } = req.body;
    const category = Category({
        name: name,
        description: description,
    });
    await category.save();
    res.status(201).send({
        _id: category._id,
        name: category.name,
        description: category.description,
    });
};

// update category data
const updateCategory = async (req, res) => {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    try {
        const oldCategory = await Category.findById({ _id: categoryId });
        oldCategory.name = name;
        oldCategory.description = description;
        oldCategory.updateAt = Date.now();
        await oldCategory.save();

        res.status(200).send(oldCategory);
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// delete one category data
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        await Category.deleteOne({ _id: categoryId });

        res.send({ status: 'success' });
    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

// get one category data
const getOneCategory = async (req, res) => {
    const { categoryId } = req.params;
    try {
        const category = await Category.findById({ _id: categoryId });

        res.status(200).send(category);

    } catch (error) {
        res.status(500).send({
            status: "error",
            message: error.message
        });
    }
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    getOneCategory
}