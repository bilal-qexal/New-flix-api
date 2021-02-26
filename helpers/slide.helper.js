const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Slide Helper";

const mongoose = require("mongoose");
const Slide = mongoose.model("Slide");

const createSlide = (data) => {
  Console.Info(from, "createSlide is called");
  return new Promise((resolve, reject) => {
    Slide.create(data)
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateSlide = (query, data) => {
  Console.Info(from, "updateSlide is called");
  return new Promise((resolve, reject) => {
    Slide.findOneAndUpdate(query, data, { new: true })
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const deleteSlide = (id) => {
  Console.Info(from, "deleteSlide is called");
  return new Promise((resolve, reject) => {
    Slide.findByIdAndDelete(id)
      .then((done) => resolve(done))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const findSlide = (query = {}) => {
  Console.Info(from, "find-Slide is called...");
  return new Promise((resolve, reject) => {
    Slide.find(query)
      .then((actors) => resolve(actors))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  findSlide,
  createSlide,
  updateSlide,
  deleteSlide,
};
