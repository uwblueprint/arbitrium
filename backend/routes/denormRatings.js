const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");


// Get a Rating for Criteria
router.get("/:appId/:criteriaId", function(req, res) {
    try {
      db.newratings.find({ applicationId: req.params.appId, criteriaId: req.params.criteriaId }).then(function(found) {
        res.json(found);
      });
    } catch (err) {
      res.send(err);
    }
  });