import { POST, PUT } from "./Helper.js";

async function updateReviewAPI(databody) {
  return POST("/api/ratings", databody);
}

async function updateStackedAPI(databody) {
  return POST("/api/stackings", databody);
}

async function updateUserAPI(databody) {
  return POST("/api/users", databody);
}

async function updateUserProgramMembershipAPI(databody) {
  return PUT("/api/users/set-program-memberships", databody);
}

async function updateUserProgramAPI(databody) {
  return PUT("/api/users/set-program", databody);
}

async function createUserAPI(databody) {
  return POST("/api/users/create-user", databody);
}

export {
  updateReviewAPI,
  updateStackedAPI,
  updateUserAPI,
  createUserAPI,
  updateUserProgramAPI,
  updateUserProgramMembershipAPI
};
