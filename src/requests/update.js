import { POST, PUT } from "./Helper.js";

async function createReviewAPI(data) {
  const response = await fetch(proxy + "/api/feedback", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  const body = await response.json();
  if (response.status !== 201) {
    console.log("Error with sending review");
  }
  return body;
}

async function updateReviewAPI(databody) {
  return POST("/api/ratings", databody);
}

async function updateStackedAPI(databody) {
  return POST("/api/stackings", databody);
}

async function updateUserAPI(databody) {
  return POST("/api/users", databody);
}

async function updateUserProgramMembershipAPI(databody) {
  return PUT("/api/users/set-program-memberships", databody);
}

async function updateUserProgramAPI(databody) {
  return PUT("/api/users/set-program", databody);
}

async function createUserAPI(databody) {
  return POST("/api/users/create-user", databody);
}

export {
  updateReviewAPI,
  updateStackedAPI,
  updateUserAPI,
  createUserAPI,
  updateUserProgramAPI,
  updateUserProgramMembershipAPI
};
