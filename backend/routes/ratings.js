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

//ratings stats routes (ADMIN ONLY)
router.get("/admin/ratings/:appId", function(req, res) {
  try {
    db.reviews
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
         "averageRating": (Object.values(mergedRatings).reduce((ratingA, ratingB) => 
         ratingA+ratingB, 0)/Object.keys(mergedRatings).length).toFixed(1)});
    })
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


