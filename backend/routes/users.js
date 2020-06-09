const express = require("express");

// allows routes to be sent out
const router = express.Router();


const userSchema = require("./../models/users");
const db = require("../mongo.js");

//userModel = db[0].model("userModel", userSchema);

console.log(db.length)

router.get("/all", function(req, res) {
  db["Production"].users
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
  db["NotCreated"].users
    .updateOne({ userId: req.body.userId }, {"_id":"5e7ca0c3412aeae89f5eb81f","userId":"vBUgTex5MeNd57fdB8u4wv7kXZ52","__v":0,"email":"gmaxin@uwblueprint.org","name":"","programs":[{"_id":"5e8a8d9feb45930e72e2a413","name":"SVP Investee Grant","access":"regular user"}],"role":"Admin"}, { upsert: true })
    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
