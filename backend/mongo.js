const MONGO_CONFIGS = require("./mongo.config");
const mongoose = require("mongoose");

//Load in all of the schemas, they will attached to each successful connection
const userSchema = require("./models/users");
const applicationSchema = require("./models/application");
const rankingSchema = require("./models/stackedRankings");
const ratingSchema = require("./models/ratings");
const programSchema = require("./models/programs.js");
const organizationSchema = require("./models/organizations");

console.log("Attempting to connect to Mongo...");
const USERNAME = MONGO_CONFIGS.module.mongoUsername;
const PASS = MONGO_CONFIGS.module.mongoPassword;
const ENV = MONGO_CONFIGS.module.environment;

//For debugging the database
mongoose.set("debug", true);

//A object to store connections - this is what we export
const connections = {};

//------------------------------------------------------------------------------
//FETCH PROGRAMS
//------------------------------------------------------------------------------

//Our Authentication database holds a list of all programs.
//Once we load in the programs we can make a connection to each of them
const mongoPrograms = connect("Authentication");

//Authentication database only holds the users and programs (global scope)
const programModel = mongoPrograms.model("programModel", programSchema);
const userModel = mongoPrograms.model("userModel", userSchema);
const organizationModel = mongoPrograms.model("organizationModel", organizationSchema);
const newConnection = {
  mongo: mongoPrograms,
  users: userModel,
  programs: programModel,
  organizations: organizationModel
};
connections["Authentication"] = newConnection;

//------------------------------------------------------------------------------
//LOAD PROGRAMS
//------------------------------------------------------------------------------

connections["Authentication"].programs
  .find()
  .then(function(found) {
    //For each program create a new database connection.
    //If a database does not exist it will be created
    found.forEach((item) => {
      addConnection(item);
    });
  })
  .catch(function(err) {
    console.log("ERROR fetching programs");
    console.log(err);
  });

//Helper
function connect(database) {
  return mongoose.createConnection(
    `mongodb+srv://${USERNAME}:${PASS}@cluster0-kbiz0.mongodb.net/${database}`,
    { useNewUrlParser: true, useUnifiedTopology: true },
    function(err) {
      if (err) {
        console.log("Mongo DB connection failed: " + database);
        console.log(err);
      } else {
        console.log("Mongo DB connection successful: " + database);
      }
    }
  );
}

function addConnection(database) {
  if (connections[database._id] == null) {
    const mongo = connect(database.databaseName);

    //These collections exist in every database except Authentication (program scope)
    const applicationModel = mongo.model("applicationModel", applicationSchema);
    const rankingModel = mongo.model("rankingModel", rankingSchema);
    const ratingModel = mongo.model("ratingModel", ratingSchema);
    const newConnection = {
      mongo: mongo,
      users: userModel,
      applications: applicationModel,
      rankings: rankingModel,
      ratings: ratingModel
    };
    connections[database._id] = newConnection;
  }
}

console.log("Number of connections: " + mongoose.connections.length);
// need this for promises
mongoose.Promise = Promise;

module.exports = connections;
module.exports.addConnection = addConnection;
