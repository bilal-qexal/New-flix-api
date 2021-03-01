const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Blog Helper";
//Mongoose and models
const mongoose = require("mongoose");
const Blog = mongoose.model("Blog");

const createBlog = (data) => {
  Console.Info(from, "createBlog is called...", data);
  return new Promise((resolve, reject) => {
    Blog.create(data)
      .then((created) => resolve(created))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateBlog = (query, data) => {
  Console.Info(from, "updateBlog is called...");
  return new Promise((resolve, reject) => {
    Blog.findOneAndUpdate(query, data, { new: true })
      .then((updated) => resolve(updated))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const deleteBlog = (data) => {
  Console.Info(from, "deleteBlog is called...");
  return new Promise((resolve, reject) => {
    Blog.findByIdAndDelete(data)
      .then((deleted) => {
        return resolve(deleted);
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const getAllBlog = (query = {}) => {
  Console.Info(from, "getAllBlog is called...");
  return new Promise((resolve, reject) => {
    Blog.find(query)
      .then((groups) => resolve(groups))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  createBlog,
  updateBlog,
  deleteBlog,
  getAllBlog,
};
