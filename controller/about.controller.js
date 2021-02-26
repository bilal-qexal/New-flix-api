//Logger
const Console = require("../helpers").Console;
const from = "About Controller";
const responseHelper = require("../helpers").Response;
const aboutHelper = require("../helpers").About;

const about = (req, res) => {
  Console.Info(from, "update-About is called...");
  aboutHelper
    .updateAbout({}, req.body)
    .then((done) => responseHelper.success(res, done, "Successfully updated"))
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};

const getAbout = (req, res) => {
  Console.Info(from, "getAll is called...");
  aboutHelper
    .getAllAbout({})
    .then((done) =>
      done.length > 0 ? responseHelper.success(res, done[0], "Successfully fetch") : responseHelper.success(res, {}, "Successfully fetch")
    )
    .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
};
// const createAbout = (req, res) => {
//   Console.Info(from, "createTag is called...");
//   aboutHelper
//     .createAbout(req.body)
//     .then((done) => responseHelper.success(res, done, "Successfully created"))
//     .catch((error) => responseHelper.badRequest(res, "Request Fail", error));
// };

module.exports = {
  about,
  getAbout,
};
