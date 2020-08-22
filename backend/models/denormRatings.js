const mongoose = require("mongoose");

const ratingSchema = new mongoose.Schema(
  {
    criteriaId: {
      // name of Criteria
      type: String
    },
    applicationId: {
      type: mongoose.Schema.ObjectId
    },
    rating: {
      type: Number
    }
  },
  { collection: "newrating" }
);

const rating = mongoose.model("newRating", ratingSchema);

module.exports = rating;
