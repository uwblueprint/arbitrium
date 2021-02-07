import { GET } from "./Helper";
import { createReview } from "../Components/ReviewToolLegacy/applicationDataHelpers";

async function getReview({ user, applicationId }) {
  return GET(`/api/reviews/${user.userId}/${applicationId}`);
}

async function getReviewCount(userId, programId) {
  return GET(
    `/api/reviews/${userId}/${programId}/?` +
      new URLSearchParams({ count: true })
  );
}

async function getUserReviews(user, applicationId, programId) {
  const result = GET(`/api/reviews/${user.uid}`);
  if (result != null) {
    return result;
  } else {
    return createReview(user, applicationId, programId);
  }
}

export { getReview, getUserReviews, getReviewCount };
