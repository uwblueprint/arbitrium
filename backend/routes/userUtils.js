const firebaseAdmin = require("../firebaseAdmin");

function createRandomPassword(length) {
  const chars =
    "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+<>ABCDEFGHIJKLMNOP1234567890";
  let pass = "";
  for (let x = 0; x < length; x++) {
    const i = Math.floor(Math.random() * chars.length);
    pass += chars.charAt(i);
  }
  return pass;
}

async function createFirebaseUser(user) {
  const password = createRandomPassword(Math.floor(Math.random() * 5 + 8));
  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      displayName: user.name,
      email: user.email,
      password
    });
    return userRecord;
  } catch (e) {
    return Promise.reject(e);
  }
}

module.exports = { createFirebaseUser };
