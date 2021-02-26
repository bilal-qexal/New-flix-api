//Logger
const Console = require("../helpers").Console;
const from = "Category Controller";
const responseHelper = require("../helpers").Response;
const categoryHelper = require("../helpers").Category;

const createCategory = (req, res) => {
    Console.Info(from, "createCategory is called...")
    req.body.parent = req.body.parent ? req.body.parent : null;
    categoryHelper.createCategory(req.body)
        .then(done => responseHelper.success(res, done, "Successfully created"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

const deleteCategory = (req, res) => {
    Console.Info(from, "deleteCategory is called...")
    categoryHelper.deleteCategory(req.params.id)
        .then(done => responseHelper.success(res, done, "Successfully deleted"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

const updateCategory = (req, res) => {
    Console.Info(from, "updateCategory is called...")
    req.body.parent = req.body.parent ? req.body.parent : null;
    categoryHelper.updateCategory({ _id: req.params.id }, req.body)
        .then(done => responseHelper.success(res, done, "Successfully updated"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

const getAll = (req, res) => {
    Console.Info(from, "getAll is called...")
    categoryHelper.getAllCategories()
        .then(done => responseHelper.success(res, done, "Successfully fetch"))
        .catch(error => responseHelper.badRequest(res, "Request Fail", error))
}

module.exports = {
    createCategory,
    deleteCategory,
    updateCategory,
    getAll
}