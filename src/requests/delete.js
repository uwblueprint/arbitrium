import { DELETE } from "./Helper";

let proxy = "http://localhost:4000";
if (process.env.REACT_APP_NODE_ENV === "production") {
  proxy = process.env.REACT_APP_SERVER_PROD;
}
if (process.env.REACT_APP_NODE_ENV === "qa") {
  proxy = process.env.REACT_APP_SERVER_QA;
}

async function deleteUserAPI(userId) {
  DELETE(`/api/users/${userId}`);
}

export { deleteUserAPI };
