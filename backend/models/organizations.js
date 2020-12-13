const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
  {
    name: {
      type: String
    },
    deleted: {
      type: Boolean
    }
  },
  { collection: "organizations" }
);

module.exports = organizationSchema;
