const express = require("express");

//Allows api routes to be posted
const router = express.Router();

//Database connections: returns object of connections (connections["item"])
const db = require("../mongo.js");
const addConnection = require("../mongo.js").addConnection;

router.get("/all", function(req, res) {
  db["Authentication"].organizations
    .find()
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.post("/", function(req, res) {
  db["Authentication"].organizations
    .updateOne(
      { name: req.body.name },
      { upsert: true }
    )
    // status code 201 means created
    .then(function(newSchedule) {
      //This is a helper function in mongo.js that adds another connection
      addConnection(req.body.name);
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
