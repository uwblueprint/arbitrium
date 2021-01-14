const express = require("express");

const router = express.Router();
const db = require("../mongo.js");
//const ObjectId = require("mongodb").ObjectID;

// Base URL: /api/submissions

//------------------------------------------------------------------------------
// Form Submission
//------------------------------------------------------------------------------

//Create a new submission
router.post("/create", (req, res) => {
  db["Authentication"].submissions.create(req.body, (error, result) => {
    if (error) {
      console.error("Error inserting new submission into MongoDB");
      console.error(error);
      res.status(500).send(error);
    } else {
      res.status(201).json(result);
    }
  });
});

//Get a submission by submissionId
router.get("/:submissionId", (req, res) => {
  db["Authentication"].submissions
    .findOne({ _id: req.params.submissionId })
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(err) {
      console.error(
        `Error getting submission with ID = ${req.params.submissionId}`
      );
      console.error(err);
      res.status(500).send(err);
    });
});

//Update a form by ID
router.patch("/:submissionId", (req, res) => {
  db["Authentication"].submissions.updateOne(
    {
      _id: req.params.submissionId
    },
    req.body,
    (error, result) => {
      if (error) {
        console.error("Error updating submission");
        console.error(error);
        res.status(500).send(error);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

module.exports = router;
