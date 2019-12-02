const express = require("express");
const firebase = require("firebase");
require("firebase/firestore");
bodyParser = require('body-parser'),
cors = require('cors');
const app = express();

const FIREBASE_CONFIGS = require('./firebase.config');

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


function findReview(userId, appId) {
  const col = db.collection('reviews')
                  .where('userId', '==', userId)
                  .where('appId', '==', appId);

  return new Promise((resolve, reject) => {
    let review = {};
    col.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        review = {
          id: doc.id,
          data: doc.data()
        }
      });
      resolve(review);
    }).catch(err => reject(err));
  })
}

function findApplicantName(appId) {
  const col = db.collection('applications').where('appId', '==', appId);

  return new Promise((resolve, reject) => {
    let applicant;
    col.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        applicant = doc.data().applicant;
      });
      resolve(applicant);
    }).catch(err => {
      reject(err);
    });
  })
}
//------------------------------------------------------------------------------
//Beginning of API endpoints
//------------------------------------------------------------------------------

//Endpoints for the user profile will probably be done via google authentication
//May have store the user id in a cookie (not sure)

//Returns the entire list of applications. To be called on load to show the
//user the list of applications.
app.get('/api/applications/:userId', (req, res) => {
  const reviewsCol = db.collection('reviews').where('userId', '==', Number(req.params.userId));
  let responses = [];
  reviewsCol.get().then((querySnapshot) => {
    const numReviews = querySnapshot.size;
    let applicantNameLookupCompleted = 0;
    querySnapshot.forEach(doc => {
      const data = doc.data();
      findApplicantName(Number(data.appId)).then(name => {
        const response = {
          applicantName: name,
          rating: data.rating,
          lastReviewed: data.lastReviewed
        };
        responses.push(response);
        applicantNameLookupCompleted++;
        if (applicantNameLookupCompleted === numReviews) {
          res.json(responses)
        }
      }).catch(err => res.send(err));
    })
  }).catch(err => res.send(err));
})

//The only things we need to edit in an application is the comments
app.put('/api/comments/:appId/:questionId', (req, res) => {

})
app.put('/api/comments/:appId/overall', (req, res) => {

})

//Get a Review for a certain app for a certain user
//Called when a user opens an app that they want to review.
//ToDo: Is this pre-populated? Do we create if it doesn't exist?
app.get('/api/reviews/:userId/:appId', (req, res) => {
  findReview(Number(req.params.userId), Number(req.params.appId))
    .then(review => res.json(review.data));
})


// Request body: array of questionId and rating pairs, e.g. [ {"questionId": 1, "rating": 5}]
app.put('/api/reviews/:userId/:appId/ratings', (req, res) => {
  findReview(Number(req.params.userId), Number(req.params.appId))
    .then(review => {
        db.collection('reviews').doc(review.id).update({
          questionRatings: req.body
        }).then(() => findReview(Number(req.params.userId), Number(req.params.appId))
                        .then(review => res.json(review)))
          .catch(err => res.send(err));
    });
})


//Stack rankings... Perhaps we store stanked rankings under the user?
//If the user doesn't have any it defaults to the average ratings
/*
app.put('/api/user/:appId/posChange, (req, res) => {
  if rankings do not exist then create default from ratings
  else
    move the app in the params up posChange number of spots
})

*/

//Or we can just keep it in the review

app.put('/api/reviews/:userId/:appId/ranking', (req, res) => {
  findReview(Number(req.params.userId), Number(req.params.appId))
    .then(review => {
        db.collection('reviews').doc(review.id).update({
          questionRatings: req.body
        }).then(() => res.send())
          .catch(err => res.send(err));
      // TODO: consider sending back updated object
    });
})


//Get all documents in a collection
app.get('/api/questions', (req, res) => {
  console.log("Called questions");
  var col = db.collection('applications');
  var questions = []
  console.log(col);
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
