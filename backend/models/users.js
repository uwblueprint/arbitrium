const mongoose = require("mongoose");

//Name is oneOf: ["SVP Investee Grant", "SVP Teens", "SVP Perfect Pitch"]
//Access is oneOf: ["regular", "guest", "admin"]

//Regular and guest have the same access but guest users don't have their ratings
//  used in the final rating that admins can view

//Admins have guest access by default (we need to figure this out (do their ratings count?))
//   and they have access to an admin tab/button where they can see candidates and users pages
const program = new mongoose.Schema({
  name: {
    type: String
  },
  access: {
    type: String
  }
});

//TEMP JUST HAVING A ROLE AND PROGRAM FOR EMERGENCY FUND
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
    role: {
      type: String
    },
    programs: {
      type: [program]
    },
    deleted: {
      type: Boolean
    }
  },
  { collection: "user" }
);

const User = mongoose.model("Users", userSchema);

module.exports = User;
