const express = require("express");

const router = express.Router();
const db = require("../mongo.js");
const addConnection = require("../mongo.js").addConnection;

const { isAuthenticated } = require("../middlewares/auth");

router.use(isAuthenticated);

router.post("/", function(req, res) {
  db["Authentication"].organizations
    .updateOne({ name: req.body.name }, { upsert: true })
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
