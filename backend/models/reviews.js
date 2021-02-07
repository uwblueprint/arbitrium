const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  lastReviewed: {
    type: String
  },
  value: {
    type: String
  }
});

const section = new mongoose.Schema({
  id: {
    type: String
  },
  notes: [comment],
  rating: {
    type: Number
  }
});

const reviewSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.ObjectId
    },
    programId: {
      type: mongoose.Schema.ObjectId
    },
    userId: {
      type: String
    },
    rating: {
      type: Number
    },
    comments: [comment],
    lastReviewed: {
      type: String
    },
    questionList: [section]
  },
  { collection: "Reviews" }
);

module.exports = reviewSchema;
