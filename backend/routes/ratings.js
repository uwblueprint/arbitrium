const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

const { isAuthenticated } = require("../middlewares/auth");

router.get("/:userid", isAuthenticated, function(req, res) {
  try {
    if (req.query.count) {
      db[req.headers.database].ratings
        .countDocuments({ userId: req.params.userid, rating: { $ne: -1 } })
        .then((count) => {
          res.json(count);
        });
      return;
    }
    db[req.headers.database].ratings
      .find({ userId: req.params.userid })
      .then(function(found) {
        res.json(found);
      });
  } catch (err) {
    res.send(err);
  }
});

//For Admin stats
router.get("/app/:appId", isAuthenticated, function(req, res) {
  try {
    db[req.headers.database].ratings
      .find({ applicationId: req.params.appId })
      .then(function(found) {
        res.json(found);
      });
  } catch (err) {
    res.send(err);
  }
});

router.get("/", isAuthenticated, function(req, res) {
  db[req.headers.database].ratings
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

router.get("/:userid/:appId", isAuthenticated, function(req, res) {
  db[req.headers.database].ratings
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
router.post("/", isAuthenticated, function(req, res) {
  db[req.headers.database].ratings
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
