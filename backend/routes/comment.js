const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

// Get all comments by appID & criteriaID
router.get("/:appId/:criteriaId", function(req, res) {
    
    db.comments
      .find({ applicationId: req.params.appId, criteriaId: req.params.criteriaId})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.send(err);
      });
  });

// Get all comments by userId & appID & criteriaID
router.get("/:appId/:criteriaId/:userid", function(req, res) {
    
    db.comments
      .find({ applicationId: req.params.appId, userId: req.params.userid, criteriaId: req.params.criteriaId})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.send(err);
      });
  });

// create a new document if we did not get any documents satisfying the criteria 
router.post("/", function(req, res) {
    db.comments
      .updateOne(
        { userId: req.body.userId, applicationId: req.body.applicationId, criteriaId: req.body.criteriaId },
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
