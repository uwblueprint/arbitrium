const express = require("express");

//Allows api routes to be posted
const firebaseAdmin = require("../firebaseAdmin");
const router = express.Router();
const db = require("../mongo.js");

// const programsServices = require("../services/programs");
const { sendWelcomeEmail } = require("../nodemailer");
const { createFirebaseUser, deleteFirebaseUser } = require("../services/users");
const { isAuthenticated } = require("../middlewares/auth");

router.use(isAuthenticated);

router.get("/all", function(req, res) {
  db["Authentication"].programs
    .find()
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//Get a program by programId
router.get("/:programId", (req, res) => {
  db["Authentication"].programs
    .findOne({ _id: req.params.programId })
    .then(function(result) {
      res.status(200).json(result);
    })
    .catch(function(err) {
      console.error(`Error getting program with ID = ${req.params.programId}`);
      console.error(err);
      res.status(500).send(err);
    });
});

//Duplicate a program
// router.post("/duplicate/:programId", function(req, res) {
//   //Create program
//   //Copy form - set the programId to the new programId
//   //Add users
// });

// Create a program
router.post("/", function(req, res) {
  try {
    //Create the program
    db["Authentication"].programs.create(req.body, (error, result) => {
      if (error) {
        console.error(`Error creating program ${req.body.displayName}`);
        throw error;
      } else {
        // Add the organization's admins to the program

        try {
          db["Authentication"].users.updateMany(
            {
              adminOrganization: req.body.organization
            },
            {
              $addToSet: {
                programs: {
                  id: result._id,
                  role: "ADMIN"
                }
              }
            },
            (error) => {
              if (error) {
                console.error(
                  `Error adding program to Admin users, aborting program creation`
                );
                throw error;
              }
            }
          );
        } catch (e) {
          db["Authentication"].programs.findOneAndUpdate(
            { _id: result._id },
            { deleted: true },
            (error, result) => {
              if (error) {
                console.error(`Error deleting program = ${result._id}`);
              }
              throw error;
            }
          );
          throw e;
        }

        //Return the program
        res.status(201).send(result);
      }
    });
  } catch (e) {
    console.error(`Error creating program ${req.body.displayName}`);
    res.status(501).send(e);
  }
});

// Rename a program
router.patch("/:programId/name", function(req, res) {
  db["Authentication"].programs.findOneAndUpdate(
    { _id: req.params.programId },
    { displayName: req.body.name },
    (error, result) => {
      if (error) {
        console.error(
          `Error renaming program with ID = ${req.params.programId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Archive or un-archive a program
router.patch("/:programId/archived", function(req, res) {
  db["Authentication"].programs.findOneAndUpdate(
    { _id: req.params.programId },
    { archived: req.body.archived },
    (error, result) => {
      if (error) {
        console.error(
          `Error ${
            req.body.archived ? "archiving" : "unarchiving"
          } program with ID = ${req.params.programId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Delete a program
router.delete("/:programId", function(req, res) {
  db["Authentication"].programs.findOneAndUpdate(
    { _id: req.params.programId },
    { deleted: true },
    (error, result) => {
      if (error) {
        console.error(
          `Error ${
            req.body.archived ? "archiving" : "unarchiving"
          } program with ID = ${req.params.programId}`
        );
        res.status(500).send(error);
      } else {
        res.status(204).json(result);
      }
    }
  );
});

// Get all the users of a program
// Returns an array of users: [{userId, email, name, role}]
router.get("/:programId/users", function(req, res) {
  db["Authentication"].users
    .aggregate([
      {
        $match: {
          programs: {
            $elemMatch: {
              id: req.params.programId
            }
          }
        }
      },
      {
        $unwind: {
          path: "$programs"
        }
      },
      {
        $match: {
          "programs.id": req.params.programId
        }
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          email: 1,
          name: 1,
          role: "$programs.role"
        }
      }
    ])
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// Add a user to the program with the specified role, if they are not yet in the program
// Requires that the users collection has a unique index on the email field
router.post("/:programId/user", async function(req, res) {
  const userData = {
    email: req.body.email,
    role: req.body.role
  };
  try {
    const result = await db["Authentication"].users.findOneAndUpdate(
      {
        email: userData.email,
        // If the user is already in the program, this will try to upsert and throw a DuplicateKey error
        programs: {
          $not: {
            $elemMatch: {
              id: req.params.programId
            }
          }
        }
      },
      {
        $addToSet: {
          programs: {
            id: req.params.programId,
            role: userData.role
          }
        }
      },
      {
        useFindAndModify: false,
        runValidators: true,
        rawResult: true,
        upsert: true
      }
    );
    if (result.lastErrorObject.updatedExisting) {
      userData.userId = result.value.userId;
      userData.name = result.value.name;
    } else {
      // If this is a new user, create the Firebase user and send a welcome email
      try {
        const firebaseUser = await createFirebaseUser(userData.email);
        try {
          await db["Authentication"].users.updateOne(
            { email: userData.email },
            { userId: firebaseUser.uid }
          );
          userData.userId = firebaseUser.uid;
        } catch (e) {
          await db["Authentication"].users.deleteOne({ email: userData.email });
          await deleteFirebaseUser(firebaseUser.uid);
          throw {
            type: "Database",
            code: "mongo-db",
            message: "Error updating Mongo user.",
            error: e
          };
        }
        try {
          const link = await firebaseAdmin
            .auth()
            .generatePasswordResetLink(userData.email);
          try {
            await sendWelcomeEmail(userData.email, link);
          } catch (e) {
            throw {
              type: "Mailer",
              code: "nodemailer",
              message: "Error sending welcome email.",
              error: e
            };
          }
        } catch (e) {
          throw {
            type: "Auth",
            code: e.code,
            message: "Error. " + e.message,
            error: e
          };
        }
      } catch (e) {
        await db["Authentication"].users.deleteOne({ email: userData.email });
        throw {
          type: "Auth",
          code: e.code,
          message: "Error. " + e.message,
          error: e
        };
      }
    }
    res.status(201).json(userData);
  } catch (e) {
    if (e.code === 11000) {
      res.status(400).send({
        type: "DuplicateKey",
        code: e.code,
        message: `${userData.email} is already in this program.`,
        error: e
      });
    } else {
      res.status(400).send(e);
    }
  }
});

// Update the user's role in the program
router.patch("/:programId/user/:userId", function(req, res) {
  db["Authentication"].users.findOneAndUpdate(
    {
      userId: req.params.userId,
      "programs.id": req.params.programId
    },
    {
      $set: {
        "programs.$.role": req.body.role
      }
    },
    {
      useFindAndModify: true,
      runValidators: true,
      new: true,
      projection: {
        _id: 0,
        userId: 1,
        email: 1,
        name: 1
      }
    },
    (error, result) => {
      if (error) {
        console.error(
          `Error updating role of user with ID = ${req.params.userId} for program with ID = ${req.params.programId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
});

// Remove a user from a program
router.delete("/:programId/user/:userId", function(req, res) {
  db["Authentication"].users
    .updateOne(
      { userId: req.params.userId },
      {
        $pull: {
          programs: {
            id: req.params.programId
          }
        }
      }
    )
    .then(function(result) {
      res.status(204).json(result);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
