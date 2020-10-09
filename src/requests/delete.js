import { DELETE } from "./Helper";

async function deleteUserAPI(userId) {
  DELETE(`/api/users/${userId}`);
}

export { deleteUserAPI };
