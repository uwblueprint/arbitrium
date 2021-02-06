const mongoose = require("mongoose");

//We will only read from applications so we don't need to define a schema

const submission = new mongoose.Schema({
  submissionId: {
    type: mongoose.Schema.ObjectId
  }
});

const rankingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.ObjectId
    },
    applications: [submission],
    programId: {
      type: mongoose.Schema.ObjectId
    }
  },

  { collection: "Rankings" }
);

module.exports = rankingSchema;
