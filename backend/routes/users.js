const express = require("express");

// allows routes to be sent out
const firebaseAdmin = require("../firebaseAdmin");
const router = express.Router();
//Database connections: returns object of connections (connections["item"])
const db = require("../mongo.js");

const { sendWelcomeEmail } = require("../nodemailer");
const userUtils = require("./userUtils");
const { createFirebaseUser } = require("./userUtils");
const { deleteFirebaseUser } = require("./userUtils");

router.get("/all", function(req, res) {
  db["Authentication"].users
    .find()
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

// Get a user's programs
// Returns an array of programs: [{programId, programName, role}]
router.get("/:userId/programs", async function(req, res) {
  userUtils.getUserPrograms(req.params.userId)
    .then(function(data) {
      res.json(data[0].programs);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.get("/:userid", function(req, res) {
  //If user doesn't exist, create one and return it
  db["Authentication"].users
    .findOne({ userId: req.params.userid })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//Update a user (Not sued for creating a new user)
router.put("/set-program", function(req, res) {
  db["Authentication"].users
    .updateOne(
      { userId: req.body.userId },
      { $set: { currentProgram: req.body.programId } },
      { upsert: false }
    )
    // status code 201 means created
    .then(function(result) {
      res.status(201).json(result);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.put("/set-program-memberships", function(req, res) {
  db["Authentication"].users
    .updateOne(
      { userId: req.body.userId },
      { $set: { programs: req.body.programs } },
      { upsert: false }
    )
    // status code 201 means created
    .then(function(result) {
      res.status(201).json(result);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//Update a user (Not sued for creating a new user)
router.post("/", function(req, res) {
  db["Authentication"].users
    .updateOne({ userId: req.body.userId }, req.body, { upsert: false })
    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.delete("/:userId", function(req, res) {
  db["Authentication"].users.updateOne(
    { userId: req.params.userId },
    { $set: { deleted: true } },
    (err, result) => {
      if (err || !result || (result && result.n !== 1)) {
        res.status(500).send(err);
      } else {
        deleteFirebaseUser(req.params.userId)
          .then(() => {
            res.status(204).send();
          })
          .catch((err) => {
            console.error(`User with UID = ${req.params.userId}
              was marked deleted in MongoDB but not removed from Firebase, failed due to: ${err}`);
            // using status code 202 (accepted) to represent partial success
            res.status(202).send();
          });
      }
    }
  );
});

// TODO: remove when frotend is updated
// Create a new user in firebase and mongodb
// Sends welcome email to user on creation
router.post("/create-user", async function(req, res) {
  try {
    const userRecord = await createFirebaseUser(req.body.email);
    // Insert record into mongodb
    const mongoUserRecord = {
      userId: userRecord.uid,
      name: req.body.name,
      preferredName: req.body.preferredName,
      email: userRecord.email,
      admin: req.body.admin,
      organization: req.body.organization,
      programs: req.body.programs,
      deleted: false
    };
    try {
      await db["Authentication"].users.updateOne(
        { email: userRecord.email },
        mongoUserRecord,
        {
          upsert: true
        }
      );
    } catch (e) {
      await firebaseAdmin.auth().deleteUser(userRecord.uid);
      throw {
        type: "Database",
        code: "mongo-db",
        message: "Error posting Mongo user.",
        error: e
      };
    }
    try {
      const link = await firebaseAdmin
        .auth()
        .generatePasswordResetLink(userRecord.email);
      try {
        await sendWelcomeEmail(mongoUserRecord.email, link);
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
    // return user record
    res.json(userRecord);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

module.exports = router;
