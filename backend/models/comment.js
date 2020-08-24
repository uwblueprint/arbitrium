const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
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
    criteriaId: {
      // name of Criteria
      type: String
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

const Comments = mongoose.model("Comment", commentSchema);

module.exports = Comments;
