const express = require("express");

//Allows api routes to be posted
const router = express.Router();
//Database connections: returns object of connections (connections["item"])
const db = require("../mongo.js");

const deleteUser = require("./admin").deleteUser;

//userModel = db["EmergencyFund"].model("userModel", userSchema);

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

router.get("/:userid", function(req, res) {
  //If user doesn't exist, create one and return it
  console.log("Getting user")
  db["Authentication"].users
    .findOne({ userId: req.params.userid })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

//upsert create a new document if the query did not retrieve any documents
//satisfying the criteria. It instead does an insert.
router.post("/", function(req, res) {
  console.log("Posting a new user");
  db["Authentication"].users
    .updateOne({ userId: req.body.userId }, {"_id":"5e7ca0c3412aeae89f5eb81f","userId":"vBUgTex5MeNd57fdB8u4wv7kXZ52","__v":0,"email":"gmaxin@uwblueprint.org","name":"","programs":[{"_id":"5e8a8d9feb45930e72e2a413","name":"SVP Investee Grant","access":"regular user"}],"role":"Admin"}, { upsert: true })
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
        deleteUser(req.params.userId)
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

module.exports = router;
