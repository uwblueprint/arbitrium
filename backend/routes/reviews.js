const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

const { isAuthenticated } = require("../middlewares/auth");

router.use(isAuthenticated);

router.get("/:userid/:programId", function(req, res) {
  try {
    if (req.query.count) {
      db["Authentication"].reviews
        .countDocuments({
          userId: req.params.userid,
          rating: { $ne: -1 },
          programId: req.params.programId
        })
        .then((count) => {
          res.json(count);
        });
      return;
    }
    db["Authentication"].reviews
      .find({ userId: req.params.userid })
      .then(function(found) {
        res.json(found);
      });
  } catch (err) {
    res.send(err);
  }
});

//For Admin stats
router.get("/app/:submissionId/:programId", function(req, res) {
  try {
    db["Authentication"].reviews
      .find({
        submissionId: req.params.submissionId,
        programId: req.params.programId
      })
      .then(function(found) {
        res.json(found);
      });
  } catch (err) {
    res.send(err);
  }
});

//Unsure what this is being used for... (admin stats?)
//GetAllReviews of user with user email attached
router.get("/", function(req, res) {
  db["Authentication"].reviews
    .aggregate([
      {
        $match: { userId: req.params.userid, programId: req.params.programId }
      },
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

router.get("/:userid/:submissionId/:programId", function(req, res) {
  db["Authentication"].reviews
    .findOne({
      submissionId: req.params.submissionId,
      userId: req.params.userid,
      programId: req.params.programId
    })
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
  db["Authentication"].reviews
    .updateOne(
      {
        userId: req.body.userId,
        submissionId: req.body.submissionId,
        programId: req.body.programId
      },
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
