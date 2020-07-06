var admin = require('firebase-admin');
var serviceAccount = require('./../firebaseAdmin.json');

console.log("Attempting to Connect Firebase service account...")

let firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_FIREBASE_ADMIN_DATABASE_URL
})

if (firebaseAdmin){
  console.log("Firebase service account connection successful")
}


const express = require("express");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

router.get("/candidate-submissions", function(req, res) {
  db.applications
  .aggregate([
    {
      $lookup: {
        from: "Reviews",
        let: { appId: "$_id" },
        pipeline: [
             { $match:
                 { $expr:
                     { $and:
                         [
                          { $eq: ["$applicationId", "$$appId"] },
                          { $ne: ["$Rating", -1]},
                          { $ne: ["$userId", "vBUgTex5MeNd57fdB8u4wv7kXZ52"]},
                          { $ne: ["$userId", "hM9QRmlybTdaQkLX25FupXqjiuF2"]}
                         ]
                     }
                 }
             }
         ],
         as: "applicationReviews"
      },

    },
    {
      $project:{
              candidateName: '$Organization Name (legal name)',
              numReviews: {$size:"$applicationReviews"},
              avgRating: {$round: [{$avg: "$applicationReviews.rating" }, 2]}
          }
    },
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

    let users = []
    // List batch of users, 1000 at a time.
    firebaseAdmin.auth().listUsers(1000, nextPageToken)
      .then(listUsersResult => {
            listUsersResult.users.forEach(function(userRecord) {
              users.push(userRecord)
            //console.log('user', userRecord);
          });
          res.json(listUsersResult.users);
          if (listUsersResult.pageToken) {
            // List next batch of users.
            listAllUsers(listUsersResult.pageToken);
          }
      })
      .catch(function(error) {
        console.log('Error listing users:', error);
      });

      console.log("Hello there", users);
  }
  listAllUsers()

});


module.exports = router;
