const mongoose = require("mongoose");
//Short answer
//paragraphs
//multiple choice
//Checkboxes
//file type
//checkbox grid?

const validation = new mongoose.Schema({
  type: {
    type: String,
    enum: ["CHECKBOX", "EMAIL", "LINK"]
  },
  expression: {
    type: String
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 0
  }
});

const link = new mongoose.Schema({
  open: {
    type: Date,
    default: new Date().getTime()
  },
  close: {
    type: Date,
    default: null
  }
});

const formSettings = new mongoose.Schema({
  themeColour: {
    type: String
  },
  headerImage: {
    type: String
  },
  confirmationMessage: {
    type: String
  }
});

const option = new mongoose.Schema({
  value: {
    type: String,
    default: null
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
    default: false
  },
  description: {
    type: String
  },
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
    ],
    default: "SHORT_ANSWER"
  },
  validations: {
    type: [validation],
    default: null
  },
  x_options: {
    type: [option]
  },
  //y_options is only used for grid type questions
  y_options: {
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
  },
  sectionType: {
    type: String,
    default: "Decision Criteria",
    enum: ["Admin Info", "Decision Criteria"]
  },
  required: {
    type: Boolean,
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
      type: Boolean,
      default: true
    },
    sections: {
      type: [section]
    },
    submissionLinks: {
      type: [link]
    },
    previewLink: {
      type: link
    },
    programId: {
      type: String
    },
    settings: {
      type: formSettings,
      default: {
        themeColour: "2261AD",
        confirmationMessage: "Your response has been recorded.",
        headerImage: null
      }
    }
  },
  { collection: "Forms" }
);

module.exports = formsSchema;
