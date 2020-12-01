const mongoose = require("mongoose");

const matrix = new mongoose.Schema({
  x: {
    type: String
  },
  y: {
    type: String,
  }
});

const option = new mongoose.Schema({
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  opt: {
    type: String,
    default: null
  }
});

const answer = new mongoose.Schema({
    type: {
      type: String,
      enum: [
        "SHORT_ANSWER", //Yoptions.length = 0 | Xoptions.length = 1
        "PARAGRAPHS", //Yoptions.length = 0 | Xoptions.length = 1
        "MULTIPLE_CHOICE", //Yoptions.length = # of MC | Xoptions.length = 1
        "CHECKBOXES", //Yoptions.length = # of boxes | Xoptions.length = 1
        "FILE_UPLOAD", //Yoptions.length = 0 | Xoptions.length = 1
        "CHECKBOX_GRID" //(Y|X)options.length = # of choices
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
      type: [option]
    },
    // CHECKBOX_GRID
    answerMatrix: {
      type: [matrix]
    },
    sectionId: {
      type: String
    },
    questionId: {
      type: String,
    }
  };
  
  const submissionsSchema = new mongoose.Schema(
    {
      formId: {
        type: String
      },
      linkId: {
        type: String
      },
      submissionDate: {
        type: String,
        default: null //If null then it hasn't been submitted (i.e it is in draft mode)
      },
      lastSaveDate: {
        type: String
      },
      answers: {
        type: [answer]
      }
    },
    { collection: "Submissions" }
  );
  
  module.exports = submissionsSchema;