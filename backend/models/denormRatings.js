
var mongoose = require("mongoose");

var ratingSchema = new mongoose.Schema(
    { 
      criteriaId: { // name of Criteria
        type: String, 
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

var rating = mongoose.model("newRating", ratingSchema);

module.exports = rating; 