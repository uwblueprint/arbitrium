import { GET, POST } from "./Helper";

async function getReview({ user, applicationId, program }) {
  return GET(`/api/reviews/${user.userId}/${applicationId}/${program}`);
}

async function getReviewCount({ userId, programId }) {
  return GET(
    `/api/reviews/${userId}/${programId}/?` +
      new URLSearchParams({ count: true })
  );
}

async function updateReview(databody) {
  return POST("/api/reviews", databody);
}

//Unused right now
// async function getUserReviews(user, applicationId, programId) {
//   const result = GET(`/api/reviews/${user.uid}`);
// }

export { getReview, getReviewCount, updateReview };
