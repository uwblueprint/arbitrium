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
    type: String,
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
//Each Xoption is a collumn and ech Yoption is a row
//Each option contains a string and a min/max for validations.
//While each row/collumn can be validated independently we only care about the Xoption

//For example, you are implementing a "Checkboxes" question:
//    selected
//opt1  []
//opt2  []
//opt3  []
//opt4  []
//opt5  []

//You have multiple rows or Yoptions and one Xoption.
//To validate the checkboxes we will use the min/max of the Xoption ("selected")

const question = new mongoose.Schema({
  name: {
    type: String
  },
  required: {
    type: Boolean,
    default: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    enum: [
      "SHORT_ANSWER",
      "PARAGRAPHS",
      "MULTIPLE_CHOICE",
      "CHECKBOXES",
      "FILE_UPLOAD",
      "CHECKBOX_GRID",
      "IDENTIFIER"
    ]
  },
  validations: {
    type: [regularExpressions],
    default: null
  },
  y_options: {
    type: [option]
  },
  x_options: {
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
  },
  deleted: {
    type: Number,
    default: false
  }
});

const formsSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    createdBy: {
      type: String
    },
    draft: {
      type: Boolean
    },
    sections: {
      type: [section]
    },
    programId: {
      type: String
    }
  },
  { collection: "Forms" }
);

module.exports = formsSchema;
