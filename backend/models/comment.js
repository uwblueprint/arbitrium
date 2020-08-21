var mongoose = require("mongoose");

var commentSchema = new mongoose.Schema(
    {
        lastReviewed: {
        type: String
        },
        value: {
        type: String
        },
        userId: {
        type: String
        },
        criteriaId: { // name of Criteria
        type: String, 
        },
        applicationId: {
        type: mongoose.Schema.ObjectId
        },
        userEmail: {
          type: String
        }


    },
    { collection: "comment" }
  );

var Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;