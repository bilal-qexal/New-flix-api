const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Tag Helper";
//Mongoose and models
const mongoose = require("mongoose");
const Tag = mongoose.model("Tag");

const createTag = (data) => {
    Console.Info(from, "createTag is called...", data._doc)
    return new Promise((resolve, reject) => {
        Tag.create(data)
            .then(created => resolve(created))
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

const updateTag = (query, data) => {
    Console.Info(from, "updateTag is called...")
    return new Promise((resolve, reject) => {
        Tag.findOneAndUpdate(query, data, { new: true })
            .then(updated => resolve(updated))
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

const deleteTag = (data) => {
    Console.Info(from, "deleteTag is called...")
    return new Promise((resolve, reject) => {
        Tag.findByIdAndDelete(data)
            .then(deleted => {
                return resolve(deleted)
            })
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

const getAllTags = (query={}) => {
    Console.Info(from, "getAllTags is called...")
    return new Promise((resolve, reject) => {
        Tag.find(query)
            .then(groups => resolve(groups))
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

module.exports = {
    createTag,
    updateTag,
    deleteTag,
    getAllTags,
}