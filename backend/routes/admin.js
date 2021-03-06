const firebaseAdmin = require("../firebaseAdmin");

const express = require("express");
const router = express.Router();
const db = require("../mongo.js");

const { isAuthenticated } = require("../middlewares/auth");

router.use(isAuthenticated);

router.get("/candidate-submissions", function(req, res) {
  db[req.headers.database].applications
    .aggregate([
      {
        $lookup: {
          from: "Reviews",
          let: { appId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$applicationId", "$$appId"] },
                    { $ne: ["$rating", -1] }
                  ]
                }
              }
            }
          ],
          as: "applicationReviews"
        }
      },
      {
        $project: {
          candidateName: "$Organization Name",
          candidateName2: "$Organization Name (legal name)",
          numReviews: { $size: "$applicationReviews" },
          avgRating: { $round: [{ $avg: "$applicationReviews.rating" }, 2] }
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

router.get("/", function(req, res) {
  //Note: Firebase only returns 1000 users at a time so you have to do it in batches
  //https://firebase.google.com/docs/auth/admin/manage-users#list_all_users
  function listAllUsers(nextPageToken) {
    const users = [];
    // List batch of users, 1000 at a time.
    firebaseAdmin
      .auth()
      .listUsers(1000, nextPageToken)
      .then((listUsersResult) => {
        listUsersResult.users.forEach(function(userRecord) {
          users.push(userRecord);
        });
        res.json(listUsersResult.users);
        if (listUsersResult.pageToken) {
          // List next batch of users.
          listAllUsers(listUsersResult.pageToken);
        }
      })
      .catch(function(error) {
        console.error("Error listing users:", error);
      });
  }
  listAllUsers();
});

module.exports = router;
