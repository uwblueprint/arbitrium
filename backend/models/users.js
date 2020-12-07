const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
      unique: true
    },
    name: {
      type: String
    },
    preferredName: {
      type: String
    },
    email: {
      type: String
    },
    currentProgram: String, // program id
    deleted: {
      type: Boolean
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    }
  },
  { collection: "users" }
);

module.exports = userSchema;
