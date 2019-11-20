const express = require("express");
const firebase = require("firebase");
require("firebase/firestore");
bodyParser = require('body-parser'),
cors = require('cors');
const app = express();

const FIREBASE_CONFIGS = require('./../firebase.config');

// Doesn't work with FIREBASE_CONFIGS.projectId for some reason
firebase.initializeApp({
  apiKey: FIREBASE_CONFIGS.apiKey,
  authDomain: FIREBASE_CONFIGS.authDomain,
  databaseURL: FIREBASE_CONFIGS.databaseURL,
  projectId: "decision-io",
  storageBucket: FIREBASE_CONFIGS.storageBucket,
  messagingSenderId: FIREBASE_CONFIGS.messagingSenderId,
  appId: FIREBASE_CONFIGS.appId,
  measurementId: FIREBASE_CONFIGS.measurementId
});
var db = firebase.firestore();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.get('/', function(req, res){
	res.send("root");
});

app.get('/api/reviews/:userId/:appId', (req, res) => {
  var col = db.collection('reviews');

  var review;
  col.get().then((querySnapshot) => {
    querySnapshot.forEach(function(doc) {
        const data = doc.data();
        if (data['appId'] == req.params.appId && data['userId'] == req.params.userId) {
          console.log(doc.id, " => ", data);
          review = data;
        }
    });
    res.json(review);
  }).catch(err => res.send(err));
})

//Get all documents in a collection
app.get('/api/questions', (req, res) => {
  var col = db.collection('questions');
  var questions = []
  col.get().then((querySnapshot) => {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        questions.push(doc.data());
    });
    res.json(questions);
  }).catch(err => res.send(err));
})

app.listen(4000, () => {
  console.log("Server is listening on port:4000");
});
