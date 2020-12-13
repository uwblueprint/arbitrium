const express = require("express");
const router = express.Router();
const db = require("../mongo.js");

const { isAuthenticated } = require("../middlewares/auth");

// Get a user's programs
// Returns an array of programs: [{id, name, role}]
router.get("/:userId/programs", isAuthenticated, async function(req, res) {
  db["Authentication"].users
    .aggregate([
      {
        $match: {
          userId: req.params.userId
        }
      },
      {
        $unwind: {
          path: "$programs"
        }
      },
      {
        // TODO: remove stage after migrating
        $project: {
          role: "$programs.role",
          programId: {
            $toObjectId: "$programs.id"
          }
        }
      },
      {
        $lookup: {
          from: "programs",
          localField: "programId",
          foreignField: "_id",
          as: "program"
        }
      },
      {
        $project: {
          _id: 0,
          role: 1,
          id: { $arrayElemAt: ["$program._id", 0] },
          name: { $arrayElemAt: ["$program.displayName", 0] }
        }
      },
      {
        $group: {
          _id: "$_id",
          root: {
            $mergeObjects: "$$ROOT"
          },
          programs: {
            $push: "$$ROOT"
          }
        }
      },
      {
        $project: {
          _id: 0,
          root: 0
        }
      }
    ])
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

router.use(isAuthenticated);

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

module.exports = router;
