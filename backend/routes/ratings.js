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
router.get("/admin/:appId", function(req, res) {
  try {
    db.reviews
    .find({ applicationId: req.params.appId })
    .then(function(found) {
      let mergedComments = [], mergedRatings={}, sectionAverageSums=new Array(5).fill(0), numRatedPerSection=new Array(5).fill(0);
      //retrive all comments and ratings from each review
      found.forEach((review, index)=>{
        mergedComments=mergedComments.concat(review.comments);
        mergedRatings[review.userId]=review.rating;
        for (let i=0; i<5; i++){
          if (review.questionList[i] && review.questionList[i].rating!=-1){
            sectionAverageSums[i] += review.questionList[i].rating;
            numRatedPerSection[i]++;
          }
        }
      });
      res.json(
        {"allComments": mergedComments, 
         "allRatings": mergedRatings,
         "sectionAverages": sectionAverageSums.map((sum, index)=>(numRatedPerSection[index]===0 ? 0 : (sum/numRatedPerSection[index]).toFixed(1))),
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


