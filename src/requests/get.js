import {GET} from './Helper'
import { createReview } from "../Components/Application/applicationDataHelpers";

async function getReviewAPI(user, applicationId) {
  return GET(`/api/ratings/${user.uid}/${applicationId}`)
}

async function getUserReviewsAPI(user, applicationId) {

  let result = GET(`/api/ratings/${user.uid}`)
  if (result != null){
    return result
  }
  else {
    return createReview(user, applicationId)
  }
}

async function getApplicationReviewsAPI(app) {
  return GET(`/api/ratings/app/${app}`)
}

async function getAllRankingsAPI() {
  return GET(`/api/stackings`)
}

async function getAllReviewsAPI() {
  return GET(`/api/ratings`)
}

async function getApplicationTableData(user) {
  return GET(`/api/applications/${user.uid}`)
}
async function getCandidateSubmissions() {
  return GET(`/api/admin/candidate-submissions`)
}

async function getReviewCountAPI(userId) {
  return GET(`/api/ratings/${userId}/?` + new URLSearchParams({ count: true }))
  //const token = await user.getIdToken();
}

async function getApplicationCount() {
  return GET("/api/applications/?" + new URLSearchParams({ count: true }))
}

async function getApplicationDetails(applicationId, user) {
  return GET(`/api/applications/${applicationId}/${user.uid}`)
}

async function getAllStackingsAPI(user) {
  return GET(`/api/stackings/${user.uid}`)
}

async function getUserAPI(user) {
  console.log("YEEE")
  return GET(`/api/users/${user.uid}`)
}

async function getAllUsersAPI() {
  return GET("/api/users/all")
}

async function getAllApplicationsAPI() {
  return GET("/api/applications")
}

async function getAllFirebaseUsers() {
  return GET(`/api/admin`)
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
  getAllReviewsAPI,
  getAllUsersAPI,
  getAllRankingsAPI,
  getApplicationReviewsAPI,
  getCandidateSubmissions
};
