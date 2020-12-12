const mongoose = require("mongoose");

const coordinates = new mongoose.Schema({
  x: {
    type: Number
  },
  y: {
    type: Number
  }
});

const answer = new mongoose.Schema({
  type: {
    type: String,
    enum: [
      "SHORT_ANSWER", //Yoptions.length = 0 | Xoptions.length = 1
      "PARAGRAPHS", //Yoptions.length = 0 | Xoptions.length = 1
      "MULTIPLE_CHOICE", //Yoptions.length = 0 | Xoptions.length = # of MC
      "CHECKBOXES", //Yoptions.length = 0 | Xoptions.length = # of boxes
      "FILE_UPLOAD", //Yoptions.length = 0 | Xoptions.length = 1
      "CHECKBOX_GRID", //(Y|X)options.length = # of choices
      "IDENTIFIER"
    ]
  },
  // SHORT_ANSWER
  // PARAGRAPH
  answerString: {
    type: String
  },
  // MULTIPLE_CHOICE
  // CHECKBOXES
  answerArray: {
    type: [String]
  },
  // CHECKBOX_GRID
  answerMatrix: {
    type: [coordinates]
  },
  sectionId: {
    type: String
  },
  questionId: {
    type: String
  }
});

const submissionsSchema = new mongoose.Schema(
  {
    formId: {
      type: String
    },
    linkId: {
      type: String
    },
    submissionDate: {
      type: Date,
      default: null // If null then it hasn't been submitted (i.e it is in draft mode)
    },
    lastSaveDate: {
      type: Date
    },
    answers: {
      type: [answer]
    },
    identifier: {
      type: String // Since it is a short answer question
    }
  },
  { collection: "Submissions" }
);

module.exports = submissionsSchema;
