import { GET, POST, PATCH } from "./Helper.js";

async function createSubmission(databody) {
  return POST(`/api/submissions/create`, databody, false);
}

async function getSubmission({ submissionId }) {
  if (!submissionId) return null;
  return GET(`/api/submissions/${submissionId}`, null, false);
}

async function updateSubmission(submissionId, databody) {
  return PATCH(`/api/submissions/${submissionId}`, databody, false);
}

async function getSubmissionTableData({ user, program }) {
  return GET(`/api/submissions/user/${user.userId}/${program}`);
}

async function getAllSubmissions(programId) {
  return GET(`/api/submissions/all/${programId}`);
}

export {
  createSubmission,
  getSubmission,
  updateSubmission,
  getSubmissionTableData,
  getAllSubmissions
};
