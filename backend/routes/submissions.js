const express = require("express");

const router = express.Router();
const db = require("../mongo.js");
const ObjectId = require("mongodb").ObjectID;

// Base URL: /api/submissions

//------------------------------------------------------------------------------
// Form Submission
//------------------------------------------------------------------------------

router.post("/:submissionId", (req, res) => {
  db["Authentication"].submissions.updateOne(
    {
      _id: req.body.submissionId
    },
    req.body,
    { upsert: true },
    (error, result) => {
      if (error) {
        console.error("Error inserting new form into MongoDB");
        res.status(500).send(error);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

module.exports = router;
