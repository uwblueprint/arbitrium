let proxy = "http://localhost:4000";
if (process.env.REACT_APP_NODE_ENV === "production") {
  proxy = process.env.REACT_APP_SERVER_PROD;
}
if (process.env.REACT_APP_NODE_ENV === "qa") {
  proxy = process.env.REACT_APP_SERVER_QA;
}

async function deleteUserAPI(userId) {
  const response = await fetch(proxy + `/api/users/${userId}`, {
    method: "DELETE"
  });
  if (response.status !== 204) {
    console.log(`Error with deleting user with userid = ${userId}`);
    throw Error(response.json());
  }
}

export { deleteUserAPI };
