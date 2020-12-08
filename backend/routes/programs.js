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

router.get("/:programId/users", function(req, res) {
  db["Authentication"].users
    .find({
      programs: {
        $elemMatch: {
          id: req.params.programId
        }
      }
    },
    {
      userId: 1,
      email: 1,
      name: 1,
    })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.post("/:programId/users", async function(req, res) {
  const email = req.body.email
  try {
    const result = await db["Authentication"].users
      .updateOne(
        {
          email: email
        }, {
          $addToSet: {
            programs: {
              id: req.params.programId,
              role: req.body.role
            }
          }
        },
        {
          upsert: true
        }
      )
    // If this is a new user, create the Firebase user and send a welcome email
    if (result.upserted) {
      try {
        const firebaseUser = await createFirebaseUser(email);
        try {
          await db["Authentication"].users.updateOne(
            { email: email },
            { userId: firebaseUser.uid }
          )
        } catch (e) {
          await db["Authentication"].users.deleteOne({ email: email })
          await deleteFirebaseUser(firebaseUser.uid)
          throw {
            type: "Database",
            code: "mongo-db",
            message: "Error updating Mongo user.",
            error: e
          }
        }
        try {
          const link = await firebaseAdmin
            .auth()
            .generatePasswordResetLink(email);
          try {
            await sendWelcomeEmail(email, link);
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
        res.status(201).json(firebaseUser);
      } catch (e) {
        await db["Authentication"].users.deleteOne({ email: email })
        throw {
          type: "Auth",
          code: e.code,
          message: "Error. " + e.message,
          error: e
        };
      }
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

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
