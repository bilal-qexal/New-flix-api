const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Terms and Conditions Helper";
//Mongoose and models
const mongoose = require("mongoose");
const TermCondition = mongoose.model("TermCondition");

const updateTermsAndConditions = (query = {}, data) => {
  Console.Info(from, "update Terms and Conditions is called...");
  return new Promise((resolve, reject) => {
    TermCondition.findOneAndUpdate(query, data, { new: true, upsert: true })
      .then((updated) => resolve(updated))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const getAllTermsAndConditions = (query = {}) => {
  Console.Info(from, "getAll Terms and Conditions is called...");
  return new Promise((resolve, reject) => {
    TermCondition.find(query)
      .then((groups) => resolve(groups))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  updateTermsAndConditions,
  getAllTermsAndConditions,
};
