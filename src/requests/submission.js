import { GET, POST, PATCH, DELETE } from "./Helper.js";

async function createSubmission(databody) {
  return POST(`/api/submissions/create`, databody, false);
}

async function getSubmission({ submissionId }) {
  if (!submissionId) return null;
  return GET(`/api/submissions/${submissionId}`, null, false);
}

async function updateSubmission(submissionId, databody) {
  return PATCH(`/api/forms/${submissionId}`, databody);
}

export { createSubmission, getSubmission, updateSubmission };
