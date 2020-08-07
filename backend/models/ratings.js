const mongoose = require("mongoose");

const comment = new mongoose.Schema({
  lastReviewed: {
    type: String
  },
  value: {
    type: String
  }
});

const question = new mongoose.Schema({
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
    applicationId: {
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
    questionList: [question]
  },
  { collection: "Reviews" }
);

const Ratings = mongoose.model("Ratings", reviewSchema);

module.exports = Ratings;
