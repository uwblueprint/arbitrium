const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

router.get("/:userid", function(req, res) {
  try {
    if (req.query.count) {
      db.reviews.countDocuments({ userId: req.params.userid }).then(count => {
        res.json(count);
      });
      return;
    }
    db.reviews.find({ userId: req.params.userid }).then(function(found) {
      res.json(found);
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/:userid/:appId", function(req, res) {
  db.reviews
    .find({ applicationId: req.params.appId, userId: req.params.userid })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.post("/", function(req, res) {
  db.reviews
    .updateOne(
      { userId: req.body.userId, applicationId: req.body.applicationId },
      req.body,
      { upsert: true }
    )
    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
