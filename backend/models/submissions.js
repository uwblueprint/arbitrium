const mongoose = require("mongoose");
//Short answer
//paragraphs
//multiple choice
//Checkboxes
//file type
//checkbox grid?

const option = new mongoose.Schema({
  min: {
    type: Number
  },
  max: {
    type: Number
  },
  opt: {
    type: String, //Name of the option to be displayed
    default: null
  }
});

const regularExpressions = new mongoose.Schema({
  name: {
    type: String
  },
  expression: {
    type: String
  }
});

//Yoptions and Xoptions explained:
//Each Xoption is a column and each Yoption is a row
//Each option contains a string and a min/max for validations.
//While each row/collumn can be validated independently we only care about the Xoption

//Eexample 1, you are implementing a "Checkboxes" question:
//    selected
//opt1  []
//opt2  []
//opt3  []
//opt4  []
//opt5  []

//You have multiple rows or Yoptions and one Xoption.
//To validate the checkboxes we will use the min/max of the Xoption ("selected")
//{min: 0, max: Yoptions.length, opt: "selected"}

//If you were implementing the multiple choice then your Xoption ("selected")
//would be {min: 0, max: 1, opt: "selected"}

const question = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
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
  validations: {
    type: [regularExpressions],
    default: null
  },
  Yoptions: {
    type: [option]
  },
  Xoptions: {
    type: [option]
  }
});

const section = new mongoose.Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  questions: {
    type: [question]
  }
});

//look into type unions again
//parse the answer string based on type
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
  answer: {
    type: String
  },
  sectionId: {
    type: String
  },
  questionId: {
    type: String,
  }
}

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
