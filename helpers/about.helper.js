const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "About Helper";
//Mongoose and models
const mongoose = require("mongoose");
const About = mongoose.model("About");

const updateAbout = (query = {}, data) => {
  Console.Info(from, "update-About is called...");
  return new Promise((resolve, reject) => {
    About.findOneAndUpdate(query, data, { new: true, upsert: true })
      .then((updated) => resolve(updated))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const getAllAbout = (query = {}) => {
  Console.Info(from, "getAll-About is called...");
  return new Promise((resolve, reject) => {
    About.find(query)
      .then((groups) => resolve(groups))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  updateAbout,
  getAllAbout,
};
