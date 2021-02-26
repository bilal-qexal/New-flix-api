const Promise = require("bluebird");
const Console = require("./console.helper");
const from = "Auth Helper";
const constants = require("../constants");
const _ = require("lodash");
const jwt = require("jsonwebtoken");
// const crypto = require("crypto");
// const moment = require("moment");
const mongoose = require("mongoose");
const Actor = mongoose.model("Actor");


const signUp = (data) => {
    Console.Info(from, "signUp is called...");
    return new Promise((resolve, reject) => {
        validateActorSignUp(data).then(clear => {
            createActor(data).then(created => {
                // console.log(created)
                generatetoken(created).then((token) => resolve({ actor: _.pick(created, constants.actor_pick_sign_up), token: token }))
            })
        }).catch(error => reject(error))
    })
}



const validateActorSignUp = (data) => {
    return new Promise((resolve, reject) => {
        let queries = []
        if (data.name) queries.push({ name: data.name })
        Actor.find({ $or: queries }).then(user => {
            if (user.length > 0) return reject({ message: "Already register!" })
            else return resolve()
        }).catch(error => {
            Console.Error(from, error);
            return reject(error)
        })
    })
}


const createActor = (data) => {
    return new Promise((resolve, reject) => {
        Actor.create(data).then(actor => {
            // console.log(actor)
            resolve(actor)
        }).catch(error => {
            Console.Error(from, error);
            return reject(error)
        })
    })
}

const generatetoken = (actor) => {
    return new Promise((resolve, reject) => {
        const token = jwt.sign({ name: actor.name, info: actor.info, image: actor.image, dateOfBirth: actor.dateOfBirth }, process.env.JWT_SECRET, {
            expiresIn: "5 years",
        })
        return resolve(token);
    })
}


const findActor = (query) => {
    Console.Info(from, "findActor is called...");
    return new Promise((resolve, reject) => {
        Actor.find(query).then((actors) => resolve(actors))
            .catch((error) => {
                Console.Error(from, error);
                return reject(error);
            });
    });
};

const deleteActor = (query) => {
    Console.Info(from, "deleteActor is called...")
    return new Promise((resolve, reject) => {
        Actor.findOneAndDelete(query)
            .then(actor => {
                return resolve(actor)
            })
            .catch(error => {
                Console.Error(from, error);
                return reject(error)
            })
    })
}

const updateOneActor = (query, values) => {
    Console.Info(from, "updateActor is called...");
    return new Promise((resolve, reject) => {
        Actor.findOneAndUpdate(query, values, { new: true })
            .then((updated) => resolve(updated))
            .catch((error) => {
                Console.Error(from, error);
                return reject(error);
            });
    });
};


const updateProfile = (data, user) => {
    Console.Info(from, "updateProfile is called...");
    return new Promise((resolve, reject) => {
        updateOneActor({ _id: user }, data)
            .then((updated) => {
                resolve(updated)
            })
            .catch((error) => {
                Console.Error(from, error);
                return reject(error);
            });
    });
};

module.exports = {
    signUp,
    findActor,
    deleteActor,
    updateProfile
}