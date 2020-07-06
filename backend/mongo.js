const MONGO_CONFIGS = require("./mongo.config");
const mongoose = require("mongoose");

//Load in all of the schemas, they will attached to each successful connection
const userSchema = require("./models/users");
const applicationSchema = require("./models/application")
const rankingSchema = require("./models/stackedRankings")
const ratingSchema = require("./models/ratings")

console.log("Attempting to connect to Mongo...");

USERNAME = MONGO_CONFIGS.module.mongoUsername;
PASS = MONGO_CONFIGS.module.mongoPassword;
ENV = MONGO_CONFIGS.module.environment;

// for debugging the database
mongoose.set("debug", true);

//connect to database server; if database doesn't exist, it will create it

let toConnect = ["Development","Production","EmergencyFund","NotCreated","Authentication"]
let connections = {}

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

  let userModel = mongo.model("userModel", userSchema);
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


console.log(mongoose.connections.length)
//console.log(mongo)

//console.log(mymodel.find());

// need this for promises
mongoose.Promise = Promise;

// require the schema
//When you make a database call you will do something like
//db.applications.find({})

//The collection that each export refers to is defined inside the /model/filename
//If you are getting [] or undefined errors please make sure everything is named correctly
//module.exports.applications = require("./models/application");
//module.exports.reviews = require("./models/ratings");
//module.exports.stackedRankings = require("./models/stackedRankings");

module.exports = connections;
//module.exports.applications = require("./models/application");
