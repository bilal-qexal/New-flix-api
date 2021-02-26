const Console = require("../helpers").Console;
const from = "Ads Controller";
const responseHelper = require("../helpers").Response;
const adsHelper = require("../helpers").Ads;
const _ = require("lodash");
const { base_url } = require("../constants");

const uploadAds = (req, res) => {
  Console.Info(from, "upload-Ads is called...");
  console.log(req.file);
  if (req.file) {
    adsHelper
      .createAds({ ads: `${base_url}/${req.file.path}`.replace(/\\/g, "/") })
      .then((done) => responseHelper.success(res, done, "Ads Uploaded Successfully!"))
      .catch((error) => responseHelper.badRequest(res, "Ads Fetch Fail!", error));
  }
};

const updateAds = (req, res) => {
  Console.Info(from, "updateAds is called...");
  adsHelper
    .updateAds({ _id: req.params.id }, { visibility: req.body.visibility })
    .then((done) => responseHelper.success(res, done, "Ads Updated Successfully!"))
    .catch((error) => responseHelper.badRequest(res, "Ads Fetch Fail!", error));
};

const deleteAds = (req, res) => {
  Console.Info(from, "deleteBanner is called...");
  adsHelper
    .deleteAds(req.params.id)
    .then((done) => responseHelper.success(res, done, "Ads Deleted Successfully!"))
    .catch((error) => responseHelper.badRequest(res, "Ads Fetch Fail!", error));
};

const getAllAdsPublic = (req, res) => {
  Console.Info(from, "getAllAdsPublic is called...");
  adsHelper
    .findAds({ visibility: true })
    .then((done) => responseHelper.success(res, done, "Ads Fetched successfully"))
    .catch((error) => responseHelper.badRequest(res, "Ads Fetch Fail!", error));
};

const getAllAdsProtected = (req, res) => {
  Console.Info(from, "getAllAdsProtected is called...");
  adsHelper
    .findAds({})
    .then((done) => responseHelper.success(res, done, "Ads Fetched successfully"))
    .catch((error) => responseHelper.badRequest(res, "Ads Fetch Fail!", error));
};
module.exports = {
  uploadAds,
  updateAds,
  getAllAdsPublic,
  getAllAdsProtected,
  deleteAds,
};
