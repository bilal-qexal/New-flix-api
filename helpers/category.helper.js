const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Category Helper";
//Mongoose and models
const mongoose = require("mongoose");
const Category = mongoose.model("Category");

const createCategory = (data) => {
    Console.Info(from, "createCategory is called...", data._doc)
    return new Promise((resolve, reject) => {
        Category.create(data)
            .then(created => resolve(created))
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

const updateCategory = (query, data) => {
    Console.Info(from, "updateCategory is called...")
    return new Promise((resolve, reject) => {
        Category.findOneAndUpdate(query, data, { new: true })
            .then(updated => resolve(updated))
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

const deleteCategory = (data) => {
    Console.Info(from, "deleteCategory is called...")
    return new Promise((resolve, reject) => {
        Category.findByIdAndDelete(data)
            .then(deleted => {
                return resolve(deleted)
            })
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

const getAllCategories = (query={}) => {
    Console.Info(from, "getAllCategories is called...")
    return new Promise((resolve, reject) => {
        Category.find(query)
            .then(groups => resolve(groups))
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}


module.exports = {
    createCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
}