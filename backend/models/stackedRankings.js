var mongoose = require("mongoose");

//We will only read from applications so we don't need to define a schema

var stackedSchema = new mongoose.Schema(
  {
    userId: {
      type: String
    },
    applications: [application]
  },
  { collection: "Ratings" }
);

var application = new mongoose.Schema({
  appId: {
    type: String
  }
});

var Stackings = mongoose.model("Stackings", stackedSchema);

module.exports = Stackings;
