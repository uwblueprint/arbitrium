const express = require("express");
const firebase = require("firebase");
require("firebase/firestore");
const app = express();
const FIREBASE_CONFIGS = require('./firebase.config');

firebase.initializeApp(FIREBASE_CONFIGS);
var db = firebase.firestore();

app.get('/review/:userId/:appId', (req, res) => {
  db.collection('reviews').get().then((querySnapshot) => {
    querySnapshot.filter(review => 
      review.userId === req.params.userId && review.appId === req.params.appId);
    res.json(querySnapshot);
  }).catch(err => res.send(err));
})

app.listen(3000, () => {
  console.log("Server is listening on port:3000");
});