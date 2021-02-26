//Logger
const Console = require("../helpers").Console;
const from = "Tag Controller";
const responseHelper = require("../helpers").Response;
const tagHelper = require("../helpers").Tag;

const createTag = (req, res) => {
    Console.Info(from, "createTag is called...")
    tagHelper.createTag(req.body)
        .then(done => responseHelper.success(res, done, "Successfully created"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

const deleteTag = (req, res) => {
    Console.Info(from, "deleteTag is called...")
    tagHelper.deleteTag(req.params.id)
        .then(done => responseHelper.success(res, done, "Successfully deleted"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

const updateTag = (req, res) => {
    Console.Info(from, "updateTag is called...")
    tagHelper.updateTag({ _id: req.params.id }, req.body)
        .then(done => responseHelper.success(res, done, "Successfully updated"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

const getAll = (req, res) => {
    Console.Info(from, "getAll is called...")
    tagHelper.getAllTags({})
        .then(done => responseHelper.success(res, done, "Successfully fetch"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

module.exports = {
    createTag,
    deleteTag,
    updateTag,
    getAll
}