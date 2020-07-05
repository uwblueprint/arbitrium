var mongoose = require("mongoose");

// Notes to add in Criteria's
var subCriteria = new mongoose.Schema({
  id: {
    type: String
  },
  note: {
    type: String
  }
});

var criteriaSchema = new mongoose.Schema(
  { 
    criteriaId: { // name of Criteria
      type: String, 
    },
    criteriaRole: { // admin, committe members...
      type: String, 
    },
    applicationId: {
      type: mongoose.Schema.ObjectId
    },
    rating: {
      type: Number
    },
    // incase you have multiple notes you want to add
    subCriteriaList: [subCriteria]
  },
  { collection: "criteria" }
);

var criteria = mongoose.model("Criteria", criteriaSchema);

module.exports = criteria;
