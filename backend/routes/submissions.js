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

//Update a submission by ID
router.patch("/:submissionId", (req, res) => {
  db["Authentication"].submissions.updateOne(
    {
      _id: req.params.submissionId
    },
    req.body,
    (error, result) => {
      if (error) {
        console.error(
          `Error updating submission with ID = ${req.params.submissionId}`
        );
        console.error(error);
        res.status(500).send(error);
      } else {
        res.status(201).json(result);
      }
    }
  );
});

router.get("/user/:userid/:programId", function(req, res) {
  db["Authentication"].submissions
    .aggregate([
      {
        $match: { submissionDate: { $ne: null } }
      },
      {
        $project: {
          identifier: 1,
          formId: 2
        }
      },
      {
        $lookup: {
          from: "Forms",
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [{ $eq: ["$programId", req.params.programId] }]
                }
              }
            },
            { $project: { _id: 1 } }
          ],
          as: "form"
        }
      },
      {
        $unwind: {
          path: "$form"
        }
      },
      {
        $project: {
          identifier: 1,
          formId: 2,
          form: 3
        }
      },
      {
        $match: { formId: "form._id" }
      },
      {
        $lookup: {
          from: "Reviews",
          let: { appId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$applicationId", "$$appId"] },
                    { $eq: ["$userId", req.params.userid] }
                  ]
                }
              }
            },
            { $project: { _id: 0, rating: 1, lastReviewed: 1 } }
          ],
          as: "ratingInfo"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", { $arrayElemAt: ["$ratingInfo", 0] }]
          }
        }
      },
      {
        $project: { ratingInfo: 0 }
      }
    ])
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      console.log(err);
      res.send(err);
    });
});

module.exports = router;
