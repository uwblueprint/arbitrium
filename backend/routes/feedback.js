const express = require("express");

const router = express.Router();
const db = require("../mongo.js");

const Feedback = require('../models/feedback')

router.post("/", function(req, res) {

  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId, 
    expierence: req.body.expierence,
    feedbackPar: req.boy.feedbackPar,
    comment: req.boy.comment
  });

  feedback.save()
          .then(result => {
            console.log(result); 
            res.status(201).json({
              message: "POST request to /feedback",
              createdFeedback: feedback
            }); 
          })
          .catch(err => {
            console.log(err); 
            res.send(err);
          }); 
  });

module.exports = router;