const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");



// Get Criteria's by AppId
// Notes & Criteria Ratings
router.get("/app/:appId", function(req, res) {
  try {
    db.criterias.find({ applicationId: req.params.appId }).then(function(found) {
      res.json(found);
    });
  } catch (err) {
    res.send(err);
  }
});

// Gets all Criteria's 
router.get("/", function(req, res) {
  db.criterias
    .find()
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// Get all reviews by userId and appID
router.get("/:userid/:appId", function(req, res) {
  db.adminreviews
    .findOne({ applicationId: req.params.appId, userId: req.params.userid })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// create a new document if we did not get any documents satisfying the criteria 
router.post("/", function(req, res) {
  db.adminreviews
    .updateOne(
      { userId: req.body.userId, applicationId: req.body.applicationId },
      req.body,
      { upsert: true }
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
