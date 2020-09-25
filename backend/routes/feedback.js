const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const Feedback = require("../models/feedback");

router.post("/", function(req, res) {
  const feedback = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    userId: req.body.userId,
    experience: req.body.experience,
    feedbackPar: req.boy.feedbackPar,
    comment: req.boy.comment
  });

  feedback
    .save()
    .then(() => {
      res.status(201).json({
        message: "POST request to /feedback",
        createdFeedback: feedback
      });
    })
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

module.exports = router;
