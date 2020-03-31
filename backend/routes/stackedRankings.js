const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

router.get("/:userid", function(req, res) {
  db.stackedRankings
    .aggregate([
      {
        $match: { userId: req.params.userid }
      },
      {
        $unwind: "$applications"
      },
      {
        $lookup: {
          from: "Reviews",
          let: { appId: "$applications.appId", userId: "$userId" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$applicationId", "$$appId"] },
                    { $eq: ["$userId", "$$userId"] }
                  ]
                }
              }
            },
            { $project: { rating: 1 } }
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
            { $project: { "Organization Name": 1 } }
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
      console.log(found);
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//stacked rankings stats routes (ADMIN ONLY) 
router.get("/admin/rankings/:appId", function(req, res) {
  try {
    db.s
    .find({ applicationId: req.params.appId })
    .then(function(found) {
      let mergedComments = [], mergedRatings={};
      //retrive all comments and ratings from each review
      found.forEach((review, index)=>{
        mergedComments.push(review.comments);
        mergedRatings[review.userId]=review.rating;
      });
      res.json(
        {"allComments": mergedComments, 
         "allRatings": mergedRatings,
        });
    })
  } catch (err) {
    res.send(err);
  }
});

router.post("/", function(req, res) {
  const stacked = {
    userId: req.body.userId,
    applications: req.body.rankings
  };
  db.stackedRankings
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
