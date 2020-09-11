import { GET } from "./Helper";
import { createReview } from "../Components/Application/applicationDataHelpers";

async function getReviewAPI(user, applicationId) {
  return GET(`/api/ratings/${user.userId}/${applicationId}`);
}

async function getUserReviewsAPI(user, applicationId) {
  const result = GET(`/api/ratings/${user.uid}`);
  if (result != null) {
    return result;
  } else {
    return createReview(user, applicationId);
  }
}

async function getApplicationReviewsAPI(app) {
  return GET(`/api/ratings/app/${app}`);
}

async function getAllRankingsAPI() {
  return GET(`/api/stackings`);
}

async function getAllReviewsAPI() {
  return GET(`/api/ratings`);
}

async function getApplicationTableData(user) {
  return GET(`/api/applications/${user.user.userId}`);
}
async function getCandidateSubmissions() {
  return GET(`/api/admin/candidate-submissions`);
}

async function getReviewCountAPI(userId) {
  return GET(`/api/ratings/${userId}/?` + new URLSearchParams({ count: true }));
}

async function getApplicationCount() {
  return GET("/api/applications/?" + new URLSearchParams({ count: true }));
}

async function getApplicationDetails(applicationId, user) {
  return GET(`/api/applications/${applicationId}/${user.uid}`);
}

async function getAllStackingsAPI(user) {
  return GET(`/api/stackings/${user.user.userId}`);
}

async function getUserAPI(user) {
  return GET(`/api/users/${user.uid}`);
}

async function getAllUsersAPI() {
  return GET("/api/users/all");
}

async function getAllApplicationsAPI() {
  return GET("/api/applications");
}

async function getAllFirebaseUsers() {
  return GET(`/api/admin`);
}

async function getAllProgramsAPI() {
  return GET(`/api/programs/all`);
}

async function getAdminViewStats(app_id) {
  return GET(`/api/ratings/admin/${app_id}`)
}

export {
  getAllStackingsAPI,
  getAllApplicationsAPI,
  getApplicationCount,
  getApplicationDetails,
  getApplicationTableData,
  getReviewAPI,
  getUserReviewsAPI,
  getReviewCountAPI,
  getUserAPI,
  getAllUsersAPI,
  getAdminViewStats,
  getAllReviewsAPI,
  getAllRankingsAPI,
  getApplicationReviewsAPI,
  getCandidateSubmissions,
  getAllProgramsAPI,
  getAllFirebaseUsers
};
