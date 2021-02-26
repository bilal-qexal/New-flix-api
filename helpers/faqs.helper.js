const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "FAQs Helper";
//Mongoose and models
const mongoose = require("mongoose");
const FAQs = mongoose.model("FAQs");

const createFAQs = (data) => {
  Console.Info(from, "createFAQs is called...", data._doc);
  return new Promise((resolve, reject) => {
    FAQs.create(data)
      .then((created) => resolve(created))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateFAQs = (query, data) => {
  Console.Info(from, "updateFAQs is called...");
  return new Promise((resolve, reject) => {
    FAQs.findOneAndUpdate(query, data, { new: true })
      .then((updated) => resolve(updated))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const deleteFAQs = (data) => {
  Console.Info(from, "deleteFAQs is called...");
  return new Promise((resolve, reject) => {
    FAQs.findByIdAndDelete(data)
      .then((deleted) => {
        return resolve(deleted);
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const getAllFAQs = (query = {}) => {
  Console.Info(from, "getAllFAQs is called...");
  return new Promise((resolve, reject) => {
    FAQs.find(query)
      .then((groups) => resolve(groups))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  createFAQs,
  updateFAQs,
  deleteFAQs,
  getAllFAQs,
};
