const express = require("express");

//Allows api routes to be posted
const router = express.Router();

//Database connections: returns object of connections (connections["item"])
const db = require("../mongo.js");
const addConnection = require("../mongo.js").addConnection;

//Programs are not "program-specific".
//We use a global database called "Authentication" for programs, users, organizations, etc...

//Get all programs
router.get("/all", function(req, res) {
  db["Authentication"].programs
    .find()
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//Create a program / Update if already exists
//DatabaseName is unique

//This route will be used for all update actions for a program.
//Inlcuding Deletes, which will always be soft
router.post("/", function(req, res) {
  db["Authentication"].programs
    .updateOne(
      {
        databaseName: req.body.databaseName
      },
      req.body,
      { upsert: true }
    )
    // status code 201 means created
    .then(function(result) {
      //This is a helper function in mongo.js that adds another connection
      addConnection(req.body.databaseName);
      res.status(201).json(result);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
