const express = require("express");
const firebase = require("firebase");
require("firebase/firestore");
bodyParser = require("body-parser");

const core = require("cors");
cors = require("cors");
const app = express();

const FIREBASE_CONFIGS = require("./firebase.config");
const MONGO_CONFIGS = require("./mongo.config");

//------------------------------------------------------------------------------
//FIREBASE INIT
//------------------------------------------------------------------------------
console.log("Attempting to connect to Firebase...");
// Doesn't work with FIREBASE_CONFIGS.projectId for some reason
firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: "https://decision-io.firebaseio.com",
  projectId: "decision-io",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});
var db = firebase.firestore();
var realtime = firebase.database();

if (db != null && realtime != null) {
  console.log("Firebase DB connection successful");
} else {
  console.log("Firebase DB connection failed");
}

//------------------------------------------------------------------------------
//FIREBASE INIT Admin
//------------------------------------------------------------------------------

/*var admin = require('firebase-admin');
var serviceAccount = require('./firebaseAdmin.json');

let firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_FIREBASE_ADMIN_DATABASE_URL
})

function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  firebaseAdmin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
}

listAllUsers()
*/
//------------------------------------------------------------------------------
//CORS
//------------------------------------------------------------------------------

//A list of websites that can access the data for the api calls.(CORS)
var whitelist = [
  "http://localhost:3000",
  "https://decision-io.firebaseapp.com",
  "https://decision-io.web.app",
  "https://qa-blueprint.firebaseapp.com",
  "https://emergencyfund.firebaseapp.com",
  "https://qa.gregmaxin.com"
];
//Include "cors(corsOptions)" to protect the endpoint
//Example: app.get('/api/questions', cors(corsOptions), (req, res) => {
var corsOptions = {
  origin: function(origin, callback) {
    //if you do "if (whitelist.indexOf(origin) !== -1 || true) {"
    //then you will be able to access it locally
    if (whitelist.indexOf(origin) !== -1 || true) {
      callback(null, true);
    } else {
      callback(new Error("Access Denied by the 'Cookie Monster' NOM NOM NOM"));
    }
  }
};

//------------------------------------------------------------------------------
//MONGO INIT
//------------------------------------------------------------------------------

//Routes are endpoints defined for a specific collection
//Each has their own file
const applicationRoutes = require("./routes/applications");
const ratingsRoutes = require("./routes/ratings");
const stackedRoutes = require("./routes/stackedRankings");
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");

// allows us to access request body in a post or put
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.send("root");
});

//FUCK CORS. FUCK FUCK FUCK FUCK FUCK FUCK FUCK
//-GREG MAXIN
//P.S: FUCK CORS
//P.P.S: Long story short this "MONGO INIT" section must be in this order
//https://codefor.life/FUCK-CORS-FUCKFUCKFUCKFUCK/

//prefix route for the routes
app.use("/api/applications", applicationRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/stackings", stackedRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/admin", adminRoutes);

app.listen(4000, () => {
  console.log("Server is listening on port:4000");
});

//------------------------------------------------------------------------------
//Beginning of API endpoints
//------------------------------------------------------------------------------

//Endpoints for the user profile will probably be done via google authentication
//May have store the user id in a cookie (not sure)

app.post("/api/authenticate/createaccount", cors(corsOptions), (req, res) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .then((user) => {
      // There is a getIdToken() method on the user object which generates a JWT token
      // I think it makes since to send this to the frontend and then keep it in a cookie
      // But having some trouble accessing methods and fields on user right now
      res.json(user);
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(
        "Account creation failed with error code: " +
          errorCode +
          " and message: " +
          errorMessage
      );
    });
});

//Returns the entire list of applications. To be called on load to show the
//user the list of applications.
// app.get("/api/applications/:userId", cors(corsOptions), (req, res) => {
//   const reviewsCol = db
//     .collection("reviews")
//     .where("userId", "==", Number(req.params.userId));
//   let responses = [];
//   reviewsCol
//     .get()
//     .then(querySnapshot => {
//       const numReviews = querySnapshot.size;
//       let applicantNameLookupCompleted = 0;
//       querySnapshot.forEach(doc => {
//         const data = doc.data();
//         findApplicantName(Number(data.appId))
//           .then(name => {
//             const response = {
//               applicantName: name,
//               rating: data.rating,
//               lastReviewed: data.lastReviewed
//             };
//             responses.push(response);
//             applicantNameLookupCompleted++;
//             if (applicantNameLookupCompleted === numReviews) {
//               res.json(responses);
//             }
//           })
//           .catch(err => res.send(err));
//       });
//     })
//     .catch(err => res.send(err));
// });

//The only things we need to edit in an application is the comments
app.put(
  "/api/comments/:appId/:questionId",
  cors(corsOptions),
  (req, res) => {}
);
app.put("/api/comments/:appId/overall", (req, res) => {});

//Get a Review for a certain app for a certain user
//Called when a user opens an app that they want to review.
//ToDo: Is this pre-populated? Do we create if it doesn't exist?
app.get("/api/reviews/:userId/:appId", cors(corsOptions), (req, res) => {
  findReview(
    Number(req.params.userId),
    Number(req.params.appId)
  ).then((review) => res.json(review.data));
});

// Request body: array of questionId and rating pairs, e.g. [ {"questionId": 1, "rating": 5}]
app.put(
  "/api/reviews/:userId/:appId/ratings",
  cors(corsOptions),
  (req, res) => {
    findReview(Number(req.params.userId), Number(req.params.appId)).then(
      (review) => {
        db.collection("reviews")
          .doc(review.id)
          .update({
            questionRatings: req.body
          })
          .then(() =>
            findReview(
              Number(req.params.userId),
              Number(req.params.appId)
            ).then((review) => res.json(review))
          )
          .catch((err) => res.send(err));
      }
    );
  }
);

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

app.put(
  "/api/reviews/:userId/:appId/ranking",
  cors(corsOptions),
  (req, res) => {
    findReview(Number(req.params.userId), Number(req.params.appId)).then(
      (review) => {
        db.collection("reviews")
          .doc(review.id)
          .update({
            questionRatings: req.body
          })
          .then(() => res.send())
          .catch((err) => res.send(err));
        // TODO: consider sending back updated object
      }
    );
  }
);

//Get all documents in a collection
app.get("/api/questions", (req, res) => {
  var col = db.collection("applications");
  var questions = [];
  col
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        //console.log(doc.id, " => ", doc.data());
        questions.push(doc.data());
      });
      res.json(questions);
    })
    .catch((err) => res.send(err));
});
