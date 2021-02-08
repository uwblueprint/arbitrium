const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

const { isAuthenticated } = require("../middlewares/auth");

router.use(isAuthenticated);

router.get("/:userId/:programId", function(req, res) {
  db["Authentication"].rankings
    .aggregate([
      {
        $match: { userId: req.params.userId, programId: req.params.programId }
      },
      {
        $unwind: "$applications"
      },
      {
        $lookup: {
          from: "Reviews",
          let: {
            appId: "$applications.appId",
            userId: "$userId",
            programId: "$programId"
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$applicationId", "$$appId"] },
                    { $eq: ["$userId", "$$userId"] },
                    { $eq: ["$programId", "$$programId"] }
                  ]
                }
              }
            },
            {
              $addFields: {
                questionRatings: {
                  $map: {
                    input: "$sectionList",
                    as: "item",
                    in: {
                      $cond: {
                        if: { $gte: ["$$item.rating", 0] },
                        then: "$$item.rating",
                        else: null
                      }
                    }
                  }
                }
              }
            },
            {
              $project: {
                rating: 1,
                suggested: {
                  $avg: "$questionRatings"
                }
              }
            }
          ],
          as: "ratingInfo"
        }
      },
      {
        $lookup: {
          from: "Applications",
          let: { appId: "$applications.appId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$appId"] } } },
            {
              $project: {
                Identifier: 1
              }
            }
          ],
          as: "applicationInfo"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [
              "$$ROOT",
              { $arrayElemAt: ["$ratingInfo", 0] },
              { $arrayElemAt: ["$applicationInfo", 0] }
            ]
          }
        }
      },
      {
        $project: { applications: 0, applicationInfo: 0, ratingInfo: 0 }
      }
    ])
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//Admin stats
router.get("/:programId", function(req, res) {
  db["Authentication"].rankings
    .find({ programId: req.params.programId })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//upsert create a new document if the query did not retrieve any documents
//satisfying the criteria. It instead does an insert.
router.post("/", function(req, res) {
  const stacked = {
    userId: req.body.userId,
    applications: req.body.rankings
  };
  db["Authentication"].rankings
    .updateOne({ userId: req.body.userId }, stacked, { upsert: true })
    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
