import { PATCH, POST, PUT } from "./Helper.js";

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

async function createProgramAPI(databody) {
  return POST("/api/programs", databody);
}

async function updateProgramNameAPI(programId, databody) {
  return PATCH(`/api/programs/${programId}/name`, databody);
}

async function updateProgramArchivedAPI(programId, databody) {
  return PATCH(`/api/programs/${programId}/archived`, databody);
}

async function createOrAddUserProgramAPI(programId, databody) {
  return POST(`/api/programs/${programId}/user`, databody);
}

async function updateUserProgramMembershipAPI(databody) {
  return PUT("/api/users/set-program-memberships", databody);
}

async function updateUserProgramAPI(userId, databody) {
  return PATCH(`/api/users/${userId}/current-program`, databody);
}

async function updateUserProgramRoleAPI(programId, userId, databody) {
  return PATCH(`/api/programs/${programId}/user/${userId}`, databody);
}

export {
  createFeedbackAPI,
  updateReviewAPI,
  updateStackedAPI,
  createProgramAPI,
  updateProgramNameAPI,
  updateProgramArchivedAPI,
  updateUserProgramAPI,
  updateUserProgramMembershipAPI,
  createOrAddUserProgramAPI,
  updateUserProgramRoleAPI,
  sendFeedbackEmail
};
