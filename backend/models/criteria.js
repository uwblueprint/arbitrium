const mongoose = require("mongoose");

// Notes to add in Criteria's
const subCriteria = new mongoose.Schema({
  id: {
    type: String
  },
  note: {
    type: String
  }
});

const criteriaSchema = new mongoose.Schema(
  {
    criteriaId: {
      // name of Criteria
      type: String
    },
    criteriaRole: {
      // admin, committe members...
      type: String
    },
    // incase you have multiple notes you want to add
    subCriteriaList: [subCriteria]
  },
  { collection: "criteria" }
);

const criteria = mongoose.model("Criteria", criteriaSchema);

module.exports = criteria;
