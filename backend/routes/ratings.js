const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

router.get("/:userid", function(req, res) {
  try {
    if (req.query.count) {
      db.reviews
        .countDocuments({ userId: req.params.userid, rating: { $ne: -1 } })
        .then((count) => {
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

//For Admin stats
router.get("/app/:appId", function(req, res) {
  try {
    db.reviews.find({ applicationId: req.params.appId }).then(function(found) {
      res.json(found);
    });
  } catch (err) {
    res.send(err);
  }
});

router.get("/", function(_, res) {
  db.reviews
    .aggregate([
      {
        $lookup: {
          from: "user",
          let: { reviewUserId: "$userId" },
          pipeline: [
            {
              $match: { $expr: { $eq: ["$userId", "$$reviewUserId"] } }
            },
            {
              $project: { email: 1 }
            }
          ],
          as: "userInfo"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$$ROOT", { $arrayElemAt: ["$userInfo", 0] }]
          }
        }
      }
    ])
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.get("/:userid/:appId", function(req, res) {
  db.reviews
    .findOne({ applicationId: req.params.appId, userId: req.params.userid })
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
