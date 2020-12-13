import { GET, POST, PATCH, DELETE } from "./Helper.js";

// FORMS
async function createForm(databody) {
  return POST("/api/forms", databody);
}

async function updateForm(formId, databody) {
  return PATCH(`/api/forms/${formId}`, databody);
}

async function getForm({ programId }) {
  return GET(`/api/forms/${programId}`);
}

//The second paramater of GET is a boolean if the endpoint requires Authorization
async function getFormBySubmission({ id }) {
  return GET(`/api/forms/submission/${id}`, false);
}

//The second paramater of GET is a boolean if the endpoint requires Authorization
async function getFormByPreview({ id }) {
  return GET(`/api/forms/preview/${id}`, false);
}

async function deleteForm(formId) {
  return DELETE(`/api/forms/${formId.formId}`);
}

// SECTIONS
async function createSection(formId, databody) {
  return POST(`/api/forms/${formId}/sections`, databody);
}

async function deleteSection(formId, sectionId) {
  return DELETE(`/api/forms/${formId}/sections/${sectionId}`);
}

async function updateSections(formId, databody) {
  return PATCH(`/api/forms/${formId}/sections`, databody);
}

// QUESTIONS
async function createQuestion(formId, sectionId, databody) {
  return POST(
    `/api/forms/${formId.formId}/sections/${sectionId}/questions`,
    databody
  );
}

async function deleteQuestion(formId, sectionId, questionId) {
  return DELETE(
    `/api/forms/${formId.formId}/sections/${sectionId}/questions/${questionId}`
  );
}

async function updateQuestions(formId, sectionId, databody) {
  return PATCH(
    `/api/forms/${formId}/sections/${sectionId}/questions`,
    databody
  );
}

export {
  getForm,
  getFormBySubmission,
  getFormByPreview,
  createForm,
  deleteForm,
  updateForm,
  createSection,
  deleteSection,
  updateSections,
  createQuestion,
  deleteQuestion,
  updateQuestions
};
