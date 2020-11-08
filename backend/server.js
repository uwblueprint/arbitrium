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
//This section must be in this order. CORS must load before everything else

//Routes are endpoints defined for a specific collection
//Each has their own file (models/routes/...)
const programRoutes = require("./routes/programs");
const applicationRoutes = require("./routes/applications");
const ratingsRoutes = require("./routes/ratings");
const stackedRoutes = require("./routes/stackedRankings");
const usersRoutes = require("./routes/users");
const adminRoutes = require("./routes/admin");
const organizationRoutes = require("./routes/organizations");
const formsRoutes = require("./routes/forms");
const feedbackRoutes = require("./routes/feedback");
const emailRoutes = require("./routes/email");
const filesRoutes = require("./routes/files");

//Allows us to access request body in a post or put
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", function(req, res) {
  res.send("root");
});

//prefix route for the routes
app.use("/api/programs", programRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/organizations", organizationRoutes);

app.use("/api/applications", applicationRoutes);
app.use("/api/ratings", ratingsRoutes);
app.use("/api/stackings", stackedRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/forms", formsRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/email", emailRoutes);
app.use("/api/files", filesRoutes);

app.listen(4000, () => {
  console.info("Server is listening on port:4000");
});
