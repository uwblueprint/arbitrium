const express = require("express");
const firebase = require("firebase");
require("firebase/firestore");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

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
const db = firebase.firestore();
const realtime = firebase.database();

if (db != null && realtime != null) {
  console.log("Firebase DB connection successful");
} else {
  console.log("Firebase DB connection failed");
}

//------------------------------------------------------------------------------
//CORS
//------------------------------------------------------------------------------

//A list of websites that can access the data for the api calls.(CORS)
const whitelist = [
  "http://localhost:3000",
  "https://decision-io.firebaseapp.com",
  "https://decision-io.web.app",
  "https://qa-blueprint.firebaseapp.com",
  "https://emergencyfund.firebaseapp.com",
  "https://qa.gregmaxin.com"
];
//Include "cors(corsOptions)" to protect the endpoint
//Example: app.get('/api/questions', cors(corsOptions), (req, res) => {
const corsOptions = {
  origin: function(origin, callback) {
    //TODO: should we get rid of this check?
    // eslint-disable-next-line no-constant-condition
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
