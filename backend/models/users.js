const mongoose = require("mongoose");

const program = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.ObjectId,
  },
  role: {
    type: String,
    enum: [
      "ADMIN",
      "ADMIN_REVIEWER",
      "REVIEWER",
      "GUEST"
    ]
  },
});

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
    currentProgram: {
      type: mongoose.SchemaTypes.ObjectId
    },
    programs: {
      type: [program]
    },
    adminOfOrganizations: {
      type: [mongoose.SchemaTypes.ObjectId]
    },
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    deleted: {
      type: Boolean
    }
  },
  { collection: "users" }
);

module.exports = userSchema;
