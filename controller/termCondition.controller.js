//Logger
const Console = require("../helpers").Console;
const from = "Terms and Conditions Controller";
const responseHelper = require("../helpers").Response;
const aboutHelper = require("../helpers").TermCondition;

const termsAndCondition = (req, res) => {
  Console.Info(from, "update Terms and Condition is called...");
  aboutHelper
    .updateTermsAndConditions({}, req.body)
    .then((done) => responseHelper.success(res, done, "Successfully updated"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const getTermsAndCondition = (req, res) => {
  Console.Info(from, "getAll Terms and Condition is called...");
  aboutHelper
    .getAllTermsAndConditions({})
    .then((done) =>
      done.length > 0 ? responseHelper.success(res, done[0], "Successfully fetch") : responseHelper.success(res, {}, "Successfully fetch")
    )
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

module.exports = {
  termsAndCondition,
  getTermsAndCondition,
};
