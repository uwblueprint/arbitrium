import { GET, POST, PATCH, DELETE } from "./Helper.js";

// FORMS
async function createForm(databody) {
  return POST("/api/forms", databody);
}

async function getForm(formId) {
  return GET(`/api/forms/${formId.formId}`);
}

async function deleteForm(formId) {
  return DELETE(`/api/forms/${formId.formId}`);
}

// SECTIONS
async function createSection(formId, databody) {
  return POST(`/api/forms/${formId.formId}/sections`, databody);
}

async function deleteSection(formId, sectionId) {
  return DELETE(`/api/forms/${formId.formId}/sections/${sectionId}`);
}

async function updateSection(formId, databody) {
  return PATCH(`/api/forms/${formId.formId}/sections`, databody);
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

async function updateQuestion(formId, sectionId, databody) {
  return PATCH(
    `/api/forms/${formId.formId}/sections/${sectionId}/questions`,
    databody
  );
}

export {
  getForm,
  createForm,
  deleteForm,
  createSection,
  deleteSection,
  updateSection,
  createQuestion,
  deleteQuestion,
  updateQuestion
};
