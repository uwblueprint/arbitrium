const MONGO_CONFIGS = require("./mongo.config");
const mongoose = require("mongoose");

console.log("Attempting to connect to Mongo");

USERNAME = MONGO_CONFIGS.module.mongoUsername;
PASS = MONGO_CONFIGS.module.mongoPassword;
ENV = MONGO_CONFIGS.module.environment;

// for debugging the database
mongoose.set("debug", true);

// connect to database server; if database doesn't exist, it will create it
var mongo = mongoose.connect(
  `mongodb+srv://${USERNAME}:${PASS}@cluster0-kbiz0.mongodb.net/${ENV}`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      console.log("Mongo DB connection failed");
      console.log(err);
    } else {
      console.log("Mongo DB connection successful.");
    }
  }
);

// need this for promises
mongoose.Promise = Promise;

// require the schema
//When you make a database call you will do something like
//db.applications.find({})

//The collection that each export refers to is defined inside the /model/filename
//If you are getting [] or undefined errors please make sure everything is named correctly
module.exports.applications = require("./models/application");
module.exports.reviews = require("./models/ratings");
module.exports.stackedRankings = require("./models/stackedRankings");
//module.exports.applications = require("./models/application");
