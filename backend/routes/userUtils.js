const db = require("../mongo.js");
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

async function createFirebaseUser(email) {
  const password = createRandomPassword(Math.floor(Math.random() * 5 + 8));
  try {
    const userRecord = await firebaseAdmin.auth().createUser({
      email: email,
      password
    });
    return userRecord;
  } catch (e) {
    return Promise.reject(e);
  }
}

function deleteFirebaseUser(userId) {
  return new Promise((resolve, reject) => {
    firebaseAdmin
      .auth()
      .deleteUser(userId)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.error(`
          Error occurred deleting user with UID ${userId}: ${error}`);
        reject(error);
      });
  });
}

function getUserPrograms(userId) {
  return db["Authentication"].users.aggregate([
    {
      $match: {
        userId: userId
      }
    },
    {
      $unwind: {
        path: "$programs"
      }
    },
    {
      // TODO: remove stage after migrating
      $project: {
        role: 1,
        programId: {
          $toObjectId: "$programs.id"
        }
      }
    },
    {
      $lookup: {
        from: "programs",
        localField: "programId",
        foreignField: "_id",
        as: "program"
      }
    },
    {
      $project: {
        _id: 0,
        role: 1,
        programId: { $arrayElemAt: ["$program._id", 0] },
        programName: { $arrayElemAt: ["$program.displayName", 0] }
      }
    },
    {
      $group: {
        _id: "$_id",
        root: {
          $mergeObjects: "$$ROOT"
        },
        programs: {
          $push: "$$ROOT"
        }
      }
    },
    {
      $project: {
        _id: 0,
        root: 0
      }
    }
  ]);
}

module.exports = {
  createFirebaseUser,
  deleteFirebaseUser,
  getUserPrograms
};
