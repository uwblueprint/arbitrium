const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: mongoose.Schema.ObjectId,
    required: true
  },

  // bad // okay // good // null
  experience: {
    type: String,
    default: ""
  },

  // bug // suggession // other // null
  feedbackPar: {
    type: String,
    default: ""
  },

  comment: {
    type: String,
    default: ""
  }
});

// Model is a constructor for the Schema
const Feedback = mongoose.model("Feedback", feedbackSchema);
module.exports = Feedback;
