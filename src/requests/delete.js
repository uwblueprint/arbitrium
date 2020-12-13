import { DELETE } from "./Helper";

async function deleteUserProgramAPI(programId, userId) {
  DELETE(`/api/programs/${programId}/user/${userId}`);
}

export { deleteUserProgramAPI };
