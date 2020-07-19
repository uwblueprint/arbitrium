const MONGO_CONFIGS = require("./mongo.config");
const mongoose = require("mongoose");

//Load in all of the schemas, they will attached to each successful connection
const userSchema = require("./models/users");
const applicationSchema = require("./models/application")
const rankingSchema = require("./models/stackedRankings")
const ratingSchema = require("./models/ratings")
const programSchema = require("./models/programs.js")

console.log("Attempting to connect to Mongo...");
USERNAME = MONGO_CONFIGS.module.mongoUsername;
PASS = MONGO_CONFIGS.module.mongoPassword;
ENV = MONGO_CONFIGS.module.environment;

//For debugging the database
mongoose.set("debug", true);

//connect to database server; if database doesn't exist, it will create it
let toConnect = ["Development","Production","EmergencyFund","NotCreated"]
let connections = {}

//Our Authentication database holds a list of all programs.
//Once we load in the programs we can make a connection to each of them

var mongoP = mongoose.createConnection(
  `mongodb+srv://${USERNAME}:${PASS}@cluster0-kbiz0.mongodb.net/Authentication`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (err) {
      console.log("Mongo DB connection failed: " + "Authentication");
      console.log(err);
    } else {
      console.log("Mongo DB connection successful: " + "Authentication");
    }
  }
);
//Authentication database only holds the users and programs (global scope)
let programModel = mongoP.model("programModel", programSchema);
let userModel = mongoP.model("userModel", userSchema);
let newConnection = {
  mongo: mongoP,
  users: userModel,
  programs: programModel,
}
connections["Authentication"] = newConnection


connections["Authentication"].programs.find()
  .then(function(found) {
    console.log("We found some stuff yayaaaaayayayayayaay" + found)
    console.log(found)
  })
  .catch(function(err) {
});




toConnect.forEach(item => {
  var mongo = mongoose.createConnection(
    `mongodb+srv://${USERNAME}:${PASS}@cluster0-kbiz0.mongodb.net/${item}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err) {
      if (err) {
        console.log("Mongo DB connection failed: " + item);
        console.log(err);
      } else {
        console.log("Mongo DB connection successful: " + item);
      }
    }
  );

  //These collections exist in every database except Authentication (program scope)
  let applicationModel = mongo.model("applicationModel", applicationSchema);
  let rankingModel = mongo.model("rankingModel", rankingSchema);
  let ratingModel = mongo.model("ratingModel", ratingSchema);
  let newConnection = {
    mongo: mongo,
    users: userModel,
    applications: applicationModel,
    rankings: rankingModel,
    ratings: ratingModel
  }
  connections[item] = newConnection
});

console.log("Number of connections: " + mongoose.connections.length)
// need this for promises
mongoose.Promise = Promise;

module.exports = connections;
//module.exports.applications = require("./models/application");
