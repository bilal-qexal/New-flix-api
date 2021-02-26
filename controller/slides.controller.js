const Console = require("../helpers").Console;
const from = "Slides Controller";
const responseHelper = require("../helpers").Response;
const slideHelper = require("../helpers").Slide;
const _ = require("lodash");
const { base_url } = require("../constants");

const uploadSlide = (req, res) => {
  Console.Info(from, "upload-Slide is called...");
  console.log(req.file);
  if (req.file) {
    slideHelper
      .createSlide({ slide: `${base_url}/${req.file.path}`.replace(/\\/g, "/") })
      .then((done) => responseHelper.success(res, done, "Slide Uploaded Successfully!"))
      .catch((error) => responseHelper.badRequest(res, "Slide Fetch Fail!", error));
  }
};

const updateSlide = (req, res) => {
  Console.Info(from, "updateSlide is called...");
  slideHelper
    .updateSlide({ _id: req.params.id }, { visibility: req.body.visibility })
    .then((done) => responseHelper.success(res, done, "Slide Updated Successfully!"))
    .catch((error) => responseHelper.badRequest(res, "Slide Fetch Fail!", error));
};

const deleteSlide = (req, res) => {
  Console.Info(from, "deleteSlide is called...");
  slideHelper
    .deleteSlide(req.params.id)
    .then((done) => responseHelper.success(res, done, "Slide Deleted Successfully!"))
    .catch((error) => responseHelper.badRequest(res, "Slide Fetch Fail!", error));
};

const getAllSlidePublic = (req, res) => {
  Console.Info(from, "getAllSlidePublic is called...");
  slideHelper
    .findSlide({ visibility: true })
    .then((done) => responseHelper.success(res, done, "Slide Fetched successfully"))
    .catch((error) => responseHelper.badRequest(res, "Slide Fetch Fail!", error));
};

const getAllSlideProtected = (req, res) => {
  Console.Info(from, "getAllSlideProtected is called...");
  slideHelper
    .findSlide({})
    .then((done) => responseHelper.success(res, done, "Slide Fetched successfully"))
    .catch((error) => responseHelper.badRequest(res, "Slide Fetch Fail!", error));
};
module.exports = {
  uploadSlide,
  updateSlide,
  getAllSlidePublic,
  getAllSlideProtected,
  deleteSlide,
};
