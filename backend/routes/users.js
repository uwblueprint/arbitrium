const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");
const deleteUser = require("./admin").deleteUser;

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
//satisfying the criteria. It instead does an insert.
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
  db.users.deleteOne({ userId: req.params.userId }, (err, result) => {
    if (err || !result || (result && result.n !== 1)) {
      res.status(500).send(err);
    } else {
      deleteUser(req.params.userId)
        .then(() => {
          res.status(204).send();
        })
        .catch((err) => {
          console.log(`User with UID = ${req.params.userId}
            was deleted from MongoDB but not Firebase, failed due to: ${err}`);
          // using status code 202 (accepted) to represent partial success
          res.status(202).send();
        });
    }
  });
});

module.exports = router;
