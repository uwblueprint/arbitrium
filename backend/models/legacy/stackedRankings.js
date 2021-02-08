const mongoose = require("mongoose");

//We will only read from applications so we don't need to define a schema

const application = new mongoose.Schema({
  appId: {
    type: mongoose.Schema.ObjectId
  }
});

const stackedSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    applications: [application]
  },
  { collection: "StackedRankings" }
);

module.exports = stackedSchema;
