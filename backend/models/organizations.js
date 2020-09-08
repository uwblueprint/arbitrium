const mongoose = require("mongoose");

const user = new mongoose.Schema({
  userId: {
    type: String
  },
  admin: {
    type: Boolean
  }
});

//Currently we only have one role: reviewer.
//In the future we may want to have "spectators" for example
const program = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  }
});

//Programs[] is a list of program IDs that the organization has has been assigned to.
//They can only view these programs (unless admin).

const organizationSchema = new mongoose.Schema(
  {
    users: {
      type: [user]
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
