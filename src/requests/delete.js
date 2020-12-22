import { DELETE } from "./Helper";

async function deleteProgramAPI(programId) {
  DELETE(`/api/programs/${programId}`);
}

async function deleteUserProgramAPI(programId, userId) {
  DELETE(`/api/programs/${programId}/user/${userId}`);
}

export { deleteProgramAPI, deleteUserProgramAPI };
