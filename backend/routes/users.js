const express = require("express");

// allows routes to be sent out
const firebaseAdmin = require("../firebaseAdmin");
const router = express.Router();
const db = require("../mongo.js");

const { sendWelcomeEmail } = require("../nodemailer");
const { createFirebaseUser } = require("./userUtils");
const { deleteFirebaseUser } = require("./userUtils");

router.get("/all", function(req, res) {
  db.users
    .find()
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.get("/:userid", function(req, res) {
  //If user doesn't exist, create one and return it

  db.users
    .findOne({ userId: req.params.userid })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//upsert create a new document if the query did not retrieve any documents
// satisfying the criteria. It instead does an insert.
router.post("/", function(req, res) {
  console.log("Posting a new user");
  db.users
    .updateOne({ userId: req.body.userId }, req.body, { upsert: true })
    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.delete("/:userId", function(req, res) {
  db.users.updateOne(
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
            console.log(`User with UID = ${req.params.userId}
              was marked deleted in MongoDB but not removed from Firebase, failed due to: ${err}`);
            // using status code 202 (accepted) to represent partial success
            res.status(202).send();
          });
      }
    }
  );
});

// Create a new user in firebase and mongodb
// Sends welcome email to user on creation
router.post("/create-user", async function(req, res) {
  try {
    const userRecord = await createFirebaseUser(req.body);
    // Insert record into mongodb
    const mongoUserRecord = {
      userId: userRecord.uid,
      name: req.body.name,
      preferredName: req.body.preferredName,
      email: userRecord.email,
      role: "User",
      programs: req.body.programs,
      deleted: false
    };
    try {
      await db.users.updateOne({ email: userRecord.email }, mongoUserRecord, {
        upsert: true
      });
    } catch (e) {
      console.error("Error posting Mongo user.");
      console.error(e);
      await firebaseAdmin.auth().deleteUser(userRecord.uid);
      throw e;
    }
    const link = await firebaseAdmin
      .auth()
      .generatePasswordResetLink(userRecord.email);
    await sendWelcomeEmail(mongoUserRecord, link);
    // return user record
    res.json(userRecord);
  } catch (e) {
    console.error(e);
    res.status(400).send(e);
  }
});

module.exports = router;
