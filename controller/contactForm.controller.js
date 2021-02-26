//Logger
const Console = require("../helpers").Console;
const from = "FAQs Controller";
const responseHelper = require("../helpers").Response;
const contactFormHelper = require("../helpers").ContactForm;

const createContactForm = (req, res) => {
  Console.Info(from, "createContactForm is called...");
  contactFormHelper
    .createContactForm(req.body)
    .then((done) => responseHelper.success(res, done, "Successfully created"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const deleteContactForm = (req, res) => {
  Console.Info(from, "deleteContactForm is called...");
  contactFormHelper
    .deleteContactForm(req.params.id)
    .then((done) => responseHelper.success(res, done, "Successfully deleted"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const updateContactForm = (req, res) => {
  Console.Info(from, "updateContactForm is called...");
  contactFormHelper
    .updateContactForm({ _id: req.params.id }, req.body)
    .then((done) => responseHelper.success(res, done, "Successfully updated"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const getAll = (req, res) => {
  Console.Info(from, "getAll is called...");
  contactFormHelper
    .getAllContactForm({})
    .then((done) => responseHelper.success(res, done, "Successfully fetch"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

module.exports = {
  createContactForm,
  deleteContactForm,
  updateContactForm,
  getAll,
};
