const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "TopbarContent Helper";
//Mongoose and models
const mongoose = require("mongoose");
const TopbarContent = mongoose.model("TopbarContent");

const updateTopbarContent = (query = {}, data) => {
  Console.Info(from, "update-TopbarContent is called...");
  return new Promise((resolve, reject) => {
    TopbarContent.findOneAndUpdate(query, data, { new: true, upsert: true })
      .then((updated) => resolve(updated))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const getAllTopbarContent = (query = {}) => {
  Console.Info(from, "getAll-TopbarContent is called...");
  return new Promise((resolve, reject) => {
    TopbarContent.find(query)
      .then((groups) => resolve(groups))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  updateTopbarContent,
  getAllTopbarContent,
};
