const express = require("express");
const admin = require("../firebase-service");

// allows routes to be sent out
const router = express.Router();
const db = require("../mongo.js");

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    req.authToken = req.headers.authorization.split(" ")[1];
  } else {
    req.authToken = null;
  }
  next();
};

function checkIfAuthenticated(req, res, next) {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      console.log(authToken);
      const userInfo = await admin.auth().verifyIdToken(authToken);
      console.log("ok");
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .send({ error: "You are not authorized to make this request" });
    }
  });
}

router.get("/:userid", function(req, res) {
  db.reviews
    .find({ reviewer_id: req.params.userid })
    .then(function(found) {
      res.json(found);
    })
    .catch(function(err) {
      res.send(err);
    });
});

router.post("/", function(req, res) {

  console.log(req.body);
  db.reviews.updateOne({ userId: req.body.userId, applicationId: req.body.applicationId }, req.body, { upsert : true })
    // status code 201 means created
    .then(function(newSchedule) {
      res.status(201).json(newSchedule);
    })
    .catch(function(err) {
      res.send(err);
    });
});

module.exports = router;
