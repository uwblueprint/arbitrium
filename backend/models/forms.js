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
  description: {
    type: String
  },
  type: {
    type: String
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

const formsSchema = new mongoose.Schema(
  {
    name: {
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
    }
  },
  { collection: "Forms" }
);

const Forms = mongoose.model("Forms", formsSchema);
module.exports = Forms;
