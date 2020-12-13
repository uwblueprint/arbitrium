const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    programs: {
      type: [mongoose.SchemaTypes.ObjectId]
    },
    deleted: {
      type: Boolean
    }
  },
  { collection: "organizations" }
);

module.exports = organizationSchema;
