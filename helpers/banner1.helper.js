const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Banner Helper";

const mongoose = require("mongoose");
const Banner = mongoose.model("Banner");

const createBanner = (data) => {
  Console.Info(from, "createBanner is called");
  return new Promise((resolve, reject) => {
    Banner.create(data)
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateBanner = (query, data) => {
  Console.Info(from, "updateBanner is called");
  return new Promise((resolve, reject) => {
    Banner.findOneAndUpdate(query, data, { new: true })
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const deleteBanner = (id) => {
  Console.Info(from, "deleteBanner Banner is called");
  return new Promise((resolve, reject) => {
    Banner.findByIdAndDelete(id)
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const findBanner = (query = {}) => {
  Console.Info(from, "find-Banner is called...");
  return new Promise((resolve, reject) => {
    Banner.find(query)
      .then((actors) => resolve(actors))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  findBanner,
  createBanner,
  updateBanner,
  deleteBanner,
};
