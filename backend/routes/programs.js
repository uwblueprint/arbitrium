const express = require("express");

//Allows api routes to be posted
const firebaseAdmin = require("../firebaseAdmin");
const router = express.Router();
//Database connections: returns object of connections (connections["item"])
const db = require("../mongo.js");
const addConnection = require("../mongo.js").addConnection;

const { sendWelcomeEmail } = require("../nodemailer");
const { createFirebaseUser } = require("./userUtils");
const { deleteFirebaseUser } = require("./userUtils");

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

router.post("/", function(req, res) {
  db["Authentication"].programs
    .updateOne(
      {
        databaseName: req.body.databaseName,
        displayName: req.body.displayName
      },
      req.body,
      { upsert: true }
    )
    // status code 201 means created
    .then(function(newSchedule) {
      //This is a helper function in mongo.js that adds another connection
      addConnection(req.body.databaseName);
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;

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

// Add a user to the program with the specified role
router.post("/:programId/user", async function(req, res) {
  let userData = {
    email: req.body.email,
    role: req.body.role
  };
  try {
    const result = await db["Authentication"].users.findOneAndUpdate(
      {
        email: userData.email
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
    res.status(400).send(e);
  }
});

// Update the user's role in the program
router.patch("/:programId/users/:userId", function(req, res) {
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
router.delete("/:programId/users/:userId", function(req, res) {
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
