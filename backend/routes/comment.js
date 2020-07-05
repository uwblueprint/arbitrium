const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

// Get all comments by appID & criteriaID
router.get("/:appId/:criteriaId", function(req, res) {
    
    db.adminreviews
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
    
    db.adminreviews
      .find({ applicationId: req.params.appId, userId: req.params.userid, criteriaId: req.params.criteriaId})
      .then(function(found) {
        res.json(found);
      })
      .catch(function(err) {
        res.send(err);
      });
  });

