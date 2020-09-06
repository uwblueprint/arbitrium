const mongoose = require("mongoose");

const form = new mongoose.Schema({
  id: {
    type: String
  },
  openDate: {
    type: Date
  },
  closeDate: {
    type: Date
  }
});

const timeframe = new mongoose.Schema({
  openDate: {
    type: Date
  },
  closeDate: {
    type: Date
  }
});

//CreatedBy is a userId
//App Version corresponds to the release version on github
const programSchema = new mongoose.Schema(
  {
    createdByUserId: {
      type: String,
      default: null
    },
    name: {
      type: String
    },
    form: {
      type: form,
      default: null
    },
    review: {
      type: timeframe,
      default: null
    },
    appVersion: {
      type: Number
    }
  },
  { collection: "programs" }
);

module.exports = programSchema;
