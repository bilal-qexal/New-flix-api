const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "ContactForm Helper";
//Mongoose and models
const mongoose = require("mongoose");
const ContactForm = mongoose.model("ContactForm");

const createContactForm = (data) => {
  Console.Info(from, "createContactForm is called...", data._doc);
  return new Promise((resolve, reject) => {
    ContactForm.create(data)
      .then((created) => resolve(created))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const updateContactForm = (query, data) => {
  Console.Info(from, "updateContactForm is called...");
  return new Promise((resolve, reject) => {
    ContactForm.findOneAndUpdate(query, data, { new: true })
      .then((updated) => resolve(updated))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const deleteContactForm = (data) => {
  Console.Info(from, "deleteContactForm is called...");
  return new Promise((resolve, reject) => {
    ContactForm.findByIdAndDelete(data)
      .then((deleted) => {
        return resolve(deleted);
      })
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

const getAllContactForm = (query = {}) => {
  Console.Info(from, "getAllContactForm is called...");
  return new Promise((resolve, reject) => {
    ContactForm.find(query)
      .then((groups) => resolve(groups))
      .catch((error) => {
        Console.Error(from, error);
        return reject(error);
      });
  });
};

module.exports = {
  createContactForm,
  updateContactForm,
  deleteContactForm,
  getAllContactForm,
};
