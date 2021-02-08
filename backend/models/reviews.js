const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  lastReviewed: {
    type: Date
  },
  value: {
    type: String
  }
});

const section = new mongoose.Schema({
  sectionId: {
    type: mongoose.Schema.ObjectId
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
      type: mongoose.Schema.ObjectId
    },
    rating: {
      type: Number
    },
    comments: [comment],
    lastReviewed: {
      type: Date
    },
    questionList: [section]
  },
  { collection: "Reviews" }
);

module.exports = reviewSchema;
