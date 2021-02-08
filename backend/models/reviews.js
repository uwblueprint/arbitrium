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
    //Mongo gives a casting error when defined as an ObjectId
    userId: {
      type: String
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
