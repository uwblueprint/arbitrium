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

const userRole = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  role: {
    type: String,
    enum: [
      "ADMIN",
      "ADMIN_REVIEWER",
      "REVIEWER",
      "GUEST",
    ]
  },
})

//CreatedBy is a userId
//App Version corresponds to the release version on github
const programSchema = new mongoose.Schema(
  {
    createdByUserId: {
      type: String,
      default: null
    },
    databaseName: {
      type: String
    },
    displayName: {
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
    },
    users: {
      type: [userRole]
    }
  },
  { collection: "programs" }
);

module.exports = programSchema;
