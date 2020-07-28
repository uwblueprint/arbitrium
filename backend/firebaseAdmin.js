const admin = require("firebase-admin");
const serviceAccount = require("./firebaseAdmin.json");

console.log("Attempting to Connect Firebase service account...");

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_FIREBASE_ADMIN_DATABASE_URL
});

if (firebaseAdmin) {
  console.log("Firebase service account connection successful");
}

module.exports = firebaseAdmin;
