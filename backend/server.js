const express = require("express");
const firebase = require("firebase");
mongoose = require('mongoose'),
require("firebase/firestore");
bodyParser = require('body-parser'),
cors = require('cors');
const app = express();

const FIREBASE_CONFIGS = require('./firebase.config');
const MONGO_CONFIGS = require('./firebase.config');

//------------------------------------------------------------------------------
//
//------------------------------------------------------------------------------

USERNAME = MONGO_CONFIGS.mongoUsername
PASS = MONGO_CONFIGS.mongoPassword
ENV = MONGO_CONFIGS.environment

// need this for promises
mongoose.Promise = Promise;

// connect to database server; if database doesn't exist, it will create it
mongoose.connect(`mongodb+srv://${USERNAME}:${PASS}@cluster0-kbiz0.gcp.mongodb.net/${ENV}`,
  { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log('Mongo DB connection failed');
  }).catch(err=>{
    console.log('Mongo DB connection failed');
    console.log(err.message);
})

// Doesn't work with FIREBASE_CONFIGS.projectId for some reason
firebase.initializeApp({
  apiKey: FIREBASE_CONFIGS.apiKey,
  authDomain: FIREBASE_CONFIGS.authDomain,
  databaseURL: "https://decision-io.firebaseio.com",
  projectId: "decision-io",
  storageBucket: FIREBASE_CONFIGS.storageBucket,
  messagingSenderId: FIREBASE_CONFIGS.messagingSenderId,
  appId: FIREBASE_CONFIGS.appId,
  measurementId: FIREBASE_CONFIGS.measurementId,
});
var db = firebase.firestore();
var realtime = firebase.database();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.get('/', function(req, res){
	res.send("root");
});

//A list of websites that can access the data for the api calls.
var whitelist = ['http://localhost:3000', 'https://decision-io.firebaseapp.com', 'https://decision-io.web.app']
//Include "cors(corsOptions)" to protect the endpoint
//Example: app.get('/api/questions', cors(corsOptions), (req, res) => {
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Access Denied (Cookie Monster)'))
    }
  }
}

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

app.post('/api/authenticate/createaccount', cors(corsOptions), (req, res) => {
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then(user => {
      // There is a getIdToken() method on the user object which generates a JWT token
      // I think it makes since to send this to the frontend and then keep it in a cookie
      // But having some trouble accessing methods and fields on user right now
      res.json(user);
    }).catch(error => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log('Account creation failed with error code: ' + errorCode + ' and message: ' + errorMessage);
    }
  );
})

// Work in progress: Login endpoint
// app.post('/api/authenticate/login', (req, res) => {
//   firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)
//     .then(user => console.log(user))
//     .catch(error => {
//       var errorCode = error.code;
//       var errorMessage = error.message;
//       res.send('Login failed with error code: ' + errorCode + ' and message: ' + errorMessage);
//   });
//   const user = firebase.auth().currentUser;
//   const token = user.getIdToken();
//   const response = {
//     'token': token,
//     'uid': user.uid
//   }
//   res.json(response);
// })

//Returns the entire list of applications. To be called on load to show the
//user the list of applications.
app.get('/api/applications/:userId', cors(corsOptions), (req, res) => {
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

app.get('/api/applications/all', cors(corsOptions), (req, res) => {
  var applications = realtime.ref('1qvqKTZAUJqQ14QFeD9srxEmP8bFFdWIo3iW_nbiTRWk').once('value', function(snapshot) {
    console.log(snapshot);
    res.json(snapshot);
  });
  console.log(applications);
})

//The only things we need to edit in an application is the comments
app.put('/api/comments/:appId/:questionId', cors(corsOptions), (req, res) => {
})
app.put('/api/comments/:appId/overall', (req, res) => {

})

//Get a Review for a certain app for a certain user
//Called when a user opens an app that they want to review.
//ToDo: Is this pre-populated? Do we create if it doesn't exist?
app.get('/api/reviews/:userId/:appId', cors(corsOptions), (req, res) => {
  findReview(Number(req.params.userId), Number(req.params.appId))
    .then(review => res.json(review.data));
})


// Request body: array of questionId and rating pairs, e.g. [ {"questionId": 1, "rating": 5}]
app.put('/api/reviews/:userId/:appId/ratings', cors(corsOptions), (req, res) => {
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

app.put('/api/reviews/:userId/:appId/ranking', cors(corsOptions), (req, res) => {
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
app.get('/api/questions', cors(corsOptions), (req, res) => {
  var col = db.collection('applications');
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
