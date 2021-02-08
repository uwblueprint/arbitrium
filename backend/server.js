const express = require("express");
const firebase = require("firebase");
require("firebase/firestore");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

//------------------------------------------------------------------------------
//FIREBASE INIT
//------------------------------------------------------------------------------
console.info("Attempting to connect to Firebase...");
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
  console.info("Firebase DB connection successful");
} else {
  console.info("Firebase DB connection failed");
}

//------------------------------------------------------------------------------
//CORS
//------------------------------------------------------------------------------
//CORS must load before everything else

//A list of websites that can access the data for the api calls.(CORS)
const whitelist = [
  "http://localhost:3000",
  "https://localhost:3000",
  "https://arbitrium.web.app",
  "https://arbitrium.firebaseapp.com",
  "https://qa-blueprint.firebaseapp",
  "https://qa-blueprint.web.app"
];
//Include "cors(corsOptions)" to protect the endpoint
//Example: app.get('/api/questions', cors(corsOptions), (req, res) => {
const corsOptions = {
  origin: function(origin, callback) {
    //If the url trying to query our endpoints is not in the whitelist, deny access
    if (whitelist.indexOf(origin) !== -1) {
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
//Each has their own file (models/routes/...)
const programRoutes = require("./routes/programs");
const reviewRoutes = require("./routes/reviews");
const rankingRoutes = require("./routes/rankings");
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const organizationRoutes = require("./routes/organizations");
const formsRoutes = require("./routes/forms");
const feedbackRoutes = require("./routes/feedback");
const emailRoutes = require("./routes/email");
const filesRoutes = require("./routes/files");
const submissionsRoutes = require("./routes/submissions");

//legacy
const applicationLegacyRoutes = require("./routes/legacy/applications");
const ratingsLegacyRoutes = require("./routes/legacy/ratings");
const stackedLegacyRoutes = require("./routes/legacy/stackedRankings");

//Allows us to access request body in a post or put (max size of 5mb payload)
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.send("root");
});

//prefix route for the routes
app.use("/api/programs", programRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/organizations", organizationRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/submissions", submissionsRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/rankings", rankingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/files", filesRoutes);

//legacy
app.use("/api/applications", applicationLegacyRoutes);
app.use("/api/ratings", ratingsLegacyRoutes);
app.use("/api/stackings", stackedLegacyRoutes);

app.listen(4000, () => {
  console.info("Server is listening on port:4000");
});
