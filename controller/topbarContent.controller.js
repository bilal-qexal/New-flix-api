//Logger
const Console = require("../helpers").Console;
const from = "TopbarContent Controller";
const responseHelper = require("../helpers").Response;
const topbarContentHelper = require("../helpers").TopbarContent;

const topbarContent = (req, res) => {
  Console.Info(from, "update-TopbarContent is called...");
  topbarContentHelper
    .updateTopbarContent({}, req.body)
    .then((done) => responseHelper.success(res, done, "Successfully updated"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const getTopbarContent = (req, res) => {
  Console.Info(from, "getAll-TopbarContent is called...");
  topbarContentHelper
    .getAllTopbarContent({})
    .then((done) =>
      done.length > 0 ? responseHelper.success(res, done[0], "Successfully fetch") : responseHelper.success(res, {}, "Successfully fetch")
    )
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};
// const createTopbarContent = (req, res) => {
//   Console.Info(from, "createTag is called...");
//   topbarContentHelper
//     .createTopbarContent(req.body)
//     .then((done) => responseHelper.success(res, done, "Successfully created"))
//     .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
// };

module.exports = {
  topbarContent,
  getTopbarContent,
};
