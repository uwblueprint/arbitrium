const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

// Get All Criteria's
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

// To Get One Criteria By Name
router.get("/:criteriaId", function(req, res) {
  try {
    db.criterias.find({ criteriaId: req.params.criteriaId }).then(function(found) {
      res.json(found);
    });
  } catch (err) {
    res.send(err);
  }
});

// Will be used to create new criterias
router.post("/", function(req, res) {
  db.criterias
    .updateOne(
      {},
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
