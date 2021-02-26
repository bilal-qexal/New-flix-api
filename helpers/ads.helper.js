const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Ads Helper";

const mongoose = require("mongoose");
const Ads = mongoose.model("Ads");

const createAds = (data) => {
  Console.Info(from, "createAds is called");
  return new Promise((resolve, reject) => {
    Ads.create(data)
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateAds = (query, data) => {
  Console.Info(from, "updateAds is called");
  return new Promise((resolve, reject) => {
    Ads.findOneAndUpdate(query, data, { new: true })
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const deleteAds = (id) => {
  Console.Info(from, "deleteAds is called");
  return new Promise((resolve, reject) => {
    Ads.findByIdAndDelete(id)
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const findAds = (query = {}) => {
  Console.Info(from, "find-Ads is called...");
  return new Promise((resolve, reject) => {
    Ads.find(query)
      .then((actors) => resolve(actors))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  findAds,
  createAds,
  updateAds,
  deleteAds,
};
