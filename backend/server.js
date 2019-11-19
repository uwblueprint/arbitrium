const express = require("express");
const firebase = require("firebase");
require("firebase/firestore");
bodyParser = require('body-parser'),
cors = require('cors');
const app = express();

//Could not get the syntax right in firebase.config
//const FIREBASE_CONFIGS = require('./../firebase.config');

firebase.initializeApp({
  apiKey: "AIzaSyDWxBCf-A_uCeRpzhwyrF8HaVqHLUzEu_o",
  authDomain: "decision-io.firebaseapp.com",
  databaseURL: "https://decision-io.firebaseio.com",
  projectId: "decision-io",
  storageBucket: "decision-io.appspot.com",
  messagingSenderId: "459036207338",
  appId: "1:459036207338:web:f3d9b0ac292b36220dcf93",
  measurementId: "G-T81P3BTJ1T"
});
var db = firebase.firestore();

app.get('/review/:userId/:appId', (req, res) => {
  db.collection('reviews').get().then((querySnapshot) => {
    querySnapshot.filter(review =>
      review.userId === req.params.userId && review.appId === req.params.appId);
    res.json(querySnapshot);
  }).catch(err => res.send(err));
})


//Get all documents in a collection
app.get('/api/questions', (req, res) => {
  var col = db.collection('questions');

  col.get().then((querySnapshot) => {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
    res.json(querySnapshot);
  }).catch(err => res.send(err));
})

app.listen(4000, () => {
  console.log("Server is listening on port:4000");
});
