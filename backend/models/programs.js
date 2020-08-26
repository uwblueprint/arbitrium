var mongoose = require("mongoose");

var form = new mongoose.Schema({
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

var timeframe = new mongoose.Schema({
  openDate: {
    type: Date
  },
  closeDate: {
    type: Date
  }
});

var programSchema = new mongoose.Schema(
  {
    createdBy: {
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
    }
  },
  { collection: "programs" }
);


module.exports = programSchema
