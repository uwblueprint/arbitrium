import {POST} from './Helper.js'

async function updateReviewAPI(databody) {
  return POST("/api/ratings", databody)
}

async function updateStackedAPI(databody) {
  return POST( "/api/stackings", databody)
}

async function updateUserAPI(databody) {
  return POST( "/api/users", databody)
}

export { updateReviewAPI, updateStackedAPI, updateUserAPI };
