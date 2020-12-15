const db = require("../mongo.js");

function createProgram(programName, orgId) {
  let programId = "";
  try {
    db["Authentication"].programs.create({
      organization: orgId,
      displayName: programName,
      deleted: false
    });
    programId = "";
  } catch (e) {
    // return an error
  }

  // Create a form
  // try {
  // } catch (e) {}

  // Add the organization's admins to the program
  try {
    db["Authentication"].users.updateMany(
      {
        adminOrganization: orgId
      },
      {
        $addToSet: {
          programs: {
            id: programId,
            role: "ADMIN"
          }
        }
      }
    );
  } catch (e) {
    // delete the program
    // return an error
  }

  // Create an S3 bucket
}

module.exports = {
  createProgram
};
