const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");


// Get a Rating for app and criteria 
router.get("/:appId/:criteriaId", function(req, res) {
    try {
      db.newratings.find({ applicationId: req.params.appId, criteriaId: req.params.criteriaId }).then(function(found) {
        res.json(found);
      });
    } catch (err) {
      res.send(err);
    }
  });

// Add a rating or change it 
router.post("/", function(req, res) {
    db.newratings
      .updateOne(
        {applicationId: req.body.applicationId, criteriaId: req.body.criteriaId },
        req.body,
        {upsert: true }
      )
      // created
      .then(function(newSchedule) {
        res.status(201).json(newSchedule);
      })
      .catch(function(err) {
        res.send(err);
      });
  });

  module.exports = router;