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
    form: {
      type: form,
      default: null
    },
    review: {
      type: timeframe,
      default: null
    },
    appVersion: {
      type: Number,
      default: 2 //1 is for google forms data, 2 is for our own data
    },
    s3bucket: {
      type: String
    },
    deleted: {
      type: Boolean,
      default: false
    },
    archived: {
      type: Boolean,
      default: false
    },
    archivedDate: {
      type: Date,
      default: null
    }
  },
  { collection: "programs" }
);

module.exports = programSchema;
