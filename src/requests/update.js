import { POST, PUT } from "./Helper.js";

async function createFeedbackAPI(databody) {
  return POST("/api/feedback", databody);
}

async function sendFeedbackEmail(databody) {
  return POST("/api/email", databody);
}

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

async function createProgram(databody) {
  return POST(`/api/programs`, databody);
}

export {
  createFeedbackAPI,
  updateReviewAPI,
  updateStackedAPI,
  updateUserAPI,
  createUserAPI,
  updateUserProgramAPI,
  updateUserProgramMembershipAPI,
  sendFeedbackEmail
};
