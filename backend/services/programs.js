const db = require("../mongo.js");

function createProgram(dataBody) {
  let programId = "";
  try {
    db["Authentication"].programs.create(dataBody, (error, result) => {
      if (error) {
        console.error(`Error creating program ${dataBody.displayName}`);
        res.status(500).send(error);
      } else {
        programId = result._id;
        res.status(200).json(result);
      }
    });
  } catch (e) {
    `Error creating program ${dataBody.displayName}`;
  }

  console.log;

  // Add the organization's admins to the program
  try {
    db["Authentication"].users.updateMany(
      {
        adminOrganization: dataBody.orgId
      },
      {
        $addToSet: {
          programs: {
            id: result._id,
            role: "ADMIN"
          }
        }
      }
    );
  } catch (e) {
    // delete the program
    // return an error
  }
}

module.exports = {
  createProgram
};
