const express = require("express");

//Allows api routes to be posted
const router = express.Router();
//Database connections: returns object of connections (connections["item"])
const db = require("../mongo.js");
const addConnection = require("../mongo.js").addConnection;

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

router.get("/user/:userId", function(req, res) {
  db["Authentication"].users
  .aggregate([
    {
      $match: {
        userId: req.params.userId
      }
    }, {
      $unwind: {
        path: "$programs"
      }
    }, {
      $project: {
        programId: {
          $toObjectId: '$programs.id'
        }
      }
    }, {
      $lookup: {
        from: "programs", 
        localField: "programId", 
        foreignField: "_id", 
        as: "program"
      }
    }, {
      $group: {
        _id: "$id", 
        root: {
          $mergeObjects: "$$ROOT"
        }, 
        programs: {
          $push: {
            $arrayElemAt: [ "$program", 0 ]
          }
        }
      }
    }, {
      $project: {
        "_id": 1,
        "programs._id": 1, 
        "programs.displayName": 1
      }
    }
  ])
  .then(function(found) {
    res.json(found[0]["programs"]);
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
