const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  userId: {
    type: String,
    required: true
  },

  // bad // okay // good // null
  expierence: {
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
