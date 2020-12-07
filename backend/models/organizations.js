const mongoose = require("mongoose");

const user = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true
  }
})

const program = new mongoose.Schema({
  id: {
    type: mongoose.SchemaTypes.ObjectId,
    unique: true
  }
});

const organizationSchema = new mongoose.Schema(
  {
    admins: {
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
