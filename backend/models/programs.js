const mongoose = require("mongoose");

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
    organization: {
      type: mongoose.SchemaTypes.ObjectId
    },
    databaseName: {
      type: String
    },
    displayName: {
      type: String,
      default: "Untitled Program"
    },
    review: {
      type: timeframe,
      default: null
    },
    appVersion: {
      type: Number,
      default: 2 // 1 is for legacy programs, 2 is our new ones
    },
    deleted: {
      type: Boolean,
      default: false
    },
    archived: {
      type: Boolean,
      default: false
    }
  },
  { collection: "programs" }
);

module.exports = programSchema;
