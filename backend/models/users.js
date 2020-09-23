const mongoose = require("mongoose");

//Currently we only have one role: reviewer.
//In the future we may want to have "spectators" for example
const program = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  role: {
    type: String,
    default: "reviewer"
  }
});

//Programs[] is a list of program IDs that the user has been assigned to.
//They can only view these programs (unless admin).

//Organizations[] is the organizations they have been assigned to.
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
    organizations: {
      type: [String]
    },
    programs: {
      type: [program]
    },
    currentProgram: String, // program id
    deleted: {
      type: Boolean
    },
    admin: {
      type: Boolean
    }
  },
  { collection: "users" }
);

module.exports = userSchema;
