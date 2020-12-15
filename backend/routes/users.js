const express = require("express");
const router = express.Router();
const db = require("../mongo.js");

const { isAuthenticated } = require("../middlewares/auth");

// Get a user's programs that are not deleted
// Returns an array of programs:
// [
//   {
//     id: ObjectId,
//     name: String,
//     role: String,
//     orgId: ObjectId,
//     orgName: String,
//     archived: Boolean
//   }
// ]
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
          program: { $arrayElemAt: ["$program", 0] }
        }
      },
      {
        $match: {
          "program.deleted": { $ne: true }
        }
      },
      {
        $lookup: {
          from: "organizations",
          localField: "program.organization",
          foreignField: "_id",
          as: "organization"
        }
      },
      {
        $project: {
          role: 1,
          id: "$program._id",
          name: "$program.displayName",
          orgId: { $arrayElemAt: ["$organization._id", 0] },
          orgName: { $arrayElemAt: ["$organization.name", 0] },
          archived: "$program.archived"
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
router.patch("/:userId/current-program", function(req, res) {
  db["Authentication"].users.findOneAndUpdate(
    { userId: req.params.userId },
    { $set: { currentProgram: req.body.programId } },
    { upsert: false },
    (error, result) => {
      if (error) {
        console.error(
          `Error updating current program of user with ID = ${req.params.userId}`
        );
        res.status(500).send(error);
      } else {
        res.status(200).json(result);
      }
    }
  );
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

module.exports = router;
