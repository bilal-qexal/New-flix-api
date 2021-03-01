//Logger
const Console = require("../helpers").Console;
const from = "Blog Controller";
const responseHelper = require("../helpers").Response;
const blogHelper = require("../helpers").Blog;

const createBlog = (req, res) => {
  Console.Info(from, "createBlog is called...");
  blogHelper
    .createBlog(req.body)
    .then((done) => responseHelper.success(res, done, "Successfully created"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const deleteBlog = (req, res) => {
  Console.Info(from, "deleteBlog is called...");
  blogHelper
    .deleteBlog(req.params.id)
    .then((done) => responseHelper.success(res, done, "Successfully deleted"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const updateBlog = (req, res) => {
  Console.Info(from, "updateBlog is called...");
  blogHelper
    .updateBlog({ _id: req.params.id }, req.body)
    .then((done) => responseHelper.success(res, done, "Successfully updated"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const getAllProtected = (req, res) => {
  Console.Info(from, "getAll is called...");
  blogHelper
    .getAllBlog({})
    .then((done) => responseHelper.success(res, done, "Successfully fetch"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};
const getAllPublic = (req, res) => {
  Console.Info(from, "getAll is called...");
  blogHelper
    .getAllBlog({ visibility: true })
    .then((done) => responseHelper.success(res, done, "Successfully fetch"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

module.exports = {
  createBlog,
  deleteBlog,
  updateBlog,
  getAllProtected,
  getAllPublic,
};
