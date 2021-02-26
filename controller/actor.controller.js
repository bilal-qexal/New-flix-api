const Console = require("../helpers").Console;
const from = "Auth Controller";
const responseHelper = require("../helpers").Response;
const actorHelper = require("../helpers").Actor;
const _ = require("lodash");
const { base_url } = require("../constants");




const signUp = (req, res) => {
    console.log("Sign up is called");
    actorHelper.signUp(req.body)
        .then((success) => responseHelper.success(res, success, "Actor created successfully"))
        .catch((error) => responseHelper.badRequest(res, error.message, error))
}

const uploadImage = (req, res) => {
    Console.Info(from, "uploadImage is called...")
    console.log(req.file)
    if (req.file) {
        return responseHelper.success(res, { link: base_url + `/${req.file.path}` }, "File Uploaded")
    }
}


const getAllActors = (req, res) => {
    Console.Info(from, "getAllActors is called...")
    actorHelper.findActor({ _id: { $ne: req.token_decoded._id } })
        .then(deleted => responseHelper.success(res, deleted, "Actor Fetched successfully"))
        .catch(error => responseHelper.badRequest(res, "Actor Fetch Fail!", error))
}

const deleteActor = (req, res) => {
    Console.Info(from, "deleteActor is called...")
    actorHelper.deleteActor({ _id: req.params.id })
        .then(deleted => responseHelper.success(res, deleted, "Actor deleted"))
        .catch(error => responseHelper.badRequest(res, "Delete Actor Fail!", error))
}

const updateActorByAdmin = (req, res) => {
    Console.Info(from, "updateProfile is called...");
    actorHelper.updateProfile(req.body, req.params.id)
        .then((success) => responseHelper.success(res, success, "Profile Updated!"))
        .catch((error) => responseHelper.badRequest(res, "Update Profile fail!", error));
};

module.exports = {
    signUp,
    uploadImage,
    getAllActors,
    deleteActor,
    updateActorByAdmin,
}