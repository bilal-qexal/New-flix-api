const Console = require("../helpers").Console;
const from = "Banner Controller";
const responseHelper = require("../helpers").Response;
const bannerHelper = require("../helpers").Banner;
const _ = require("lodash");
const { base_url } = require("../constants");

const uploadBanner = (req, res) => {
  Console.Info(from, "upload-Banner is called...");
  console.log(req.file);
  if (req.file) {
    bannerHelper
      .createBanner({ banner: `${base_url}/${req.file.path}`.replace(/\\/g, "/") })
      .then((done) => responseHelper.success(res, done, "Banner Uploaded Successfully!"))
      .catch((error) => responseHelper.badRequest(res, "Banner Fetch Fail!", error));
  }
};

const updateBanner = (req, res) => {
  Console.Info(from, "updateBanner is called...");
  bannerHelper
    .updateBanner({ _id: req.params.id }, { visibility: req.body.visibility })
    .then((done) => responseHelper.success(res, done, "Banner Updated Successfully!"))
    .catch((error) => responseHelper.badRequest(res, "Banner Fetch Fail!", error));
};

const deleteBanner = (req, res) => {
  Console.Info(from, "deleteBanner is called...");
  bannerHelper
    .deleteBanner(req.params.id)
    .then((done) => responseHelper.success(res, done, "Banner Deleted Successfully!"))
    .catch((error) => responseHelper.badRequest(res, "Banner Fetch Fail!", error));
};

const getAllBannersPublic = (req, res) => {
  Console.Info(from, "getAllBannersPublic is called...");
  bannerHelper
    .findBanner({ visibility: true })
    .then((done) => responseHelper.success(res, done, "Banner Fetched successfully"))
    .catch((error) => responseHelper.badRequest(res, "Banner Fetch Fail!", error));
};

const getAllBannersProtected = (req, res) => {
  Console.Info(from, "getAllBannersProtected is called...");
  bannerHelper
    .findBanner({})
    .then((done) => responseHelper.success(res, done, "Banner Fetched successfully"))
    .catch((error) => responseHelper.badRequest(res, "Banner Fetch Fail!", error));
};
module.exports = {
  uploadBanner,
  updateBanner,
  getAllBannersPublic,
  getAllBannersProtected,
  deleteBanner,
};
