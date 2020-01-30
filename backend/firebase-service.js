const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE
});

module.exports = admin;
