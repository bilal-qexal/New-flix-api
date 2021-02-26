const mongoose = require("mongoose");

let uri = "";
if (process.env.NODE_ENV !== "development") {
    uri =
        "mongodb+srv://" +
        process.env.DB_USER_PRO +
        ":" +
        process.env.DB_PASSWORD_PRO +
        "@" +
        process.env.DB_HOST_PRO +
        "/" +
        process.env.DB_NAME_PRO +
        process.env.DB_authSource_PRO;
} else {
    uri = "mongodb://" + process.env.DB_HOST + ":" + process.env.DB_PORT + "/" + process.env.DB_NAME;
}

mongoose.connect(uri, { useUnifiedTopology: true, useCreateIndex: true, useNewUrlParser: true, useFindAndModify: false });
console.log("Mongoose connecting to: " + uri);
// setting promises for mongoose ORM
mongoose.Promise = require("bluebird");
//connection event
mongoose.connection.on("connected", function () {
    console.log("Mongoose connected");
    mongoose.Promise = require("bluebird");
});
// connection error event
mongoose.connection.on("error", function (err) {
    console.log("Mongoose connection error: " + err);
});
// remove connection 
mongoose.connection.on("disconnected", function () {
    console.log("Mongoose disconnected");
});
// mongoose.set("debug", true);