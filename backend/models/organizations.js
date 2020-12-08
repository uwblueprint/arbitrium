const mongoose = require("mongoose");

const program = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true
  }
});

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    programs: {
      type: [program]
    },
    deleted: {
      type: Boolean
    }
  },
  { collection: "organizations" }
);

module.exports = organizationSchema;
