//Logger
const Console = require("../helpers").Console;
const from = "FAQs Controller";
const responseHelper = require("../helpers").Response;
const faqsHelper = require("../helpers").FAQs;

const createFAQs = (req, res) => {
  Console.Info(from, "createFAQs is called...");
  faqsHelper
    .createFAQs(req.body)
    .then((done) => responseHelper.success(res, done, "Successfully created"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const deleteFAQs = (req, res) => {
  Console.Info(from, "deleteFAQs is called...");
  faqsHelper
    .deleteFAQs(req.params.id)
    .then((done) => responseHelper.success(res, done, "Successfully deleted"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const updateFAQs = (req, res) => {
  Console.Info(from, "updateFAQs is called...");
  faqsHelper
    .updateFAQs({ _id: req.params.id }, req.body)
    .then((done) => responseHelper.success(res, done, "Successfully updated"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const getAll = (req, res) => {
  Console.Info(from, "getAll is called...");
  faqsHelper
    .getAllFAQs({})
    .then((done) => responseHelper.success(res, done, "Successfully fetch"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

module.exports = {
  createFAQs,
  deleteFAQs,
  updateFAQs,
  getAll,
};
