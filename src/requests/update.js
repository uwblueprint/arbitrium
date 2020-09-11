let proxy = "http://localhost:4000";
if (process.env.REACT_APP_NODE_ENV === "production") {
  proxy = process.env.REACT_APP_SERVER_PROD;
}
if (process.env.REACT_APP_NODE_ENV === "qa") {
  proxy = process.env.REACT_APP_SERVER_QA;
}

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
  const response = await fetch(proxy + "/api/ratings", {
    method: "POST",
    body: JSON.stringify(databody),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  const body = await response.json();
  if (response.status !== 201) {
    console.log("Error with posting ratings");
  }
  return body;
}

async function updateStackedAPI(databody) {
  const response = await fetch(proxy + "/api/stackings", {
    method: "POST",
    body: JSON.stringify(databody),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  const body = await response.json();
  if (response.status !== 201) {
    console.log("Error with posting stacked ranking");
  }
  return body;
}

async function updateUserAPI(databody) {
  const response = await fetch(proxy + "/api/users", {
    method: "POST",
    body: JSON.stringify(databody),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });

  const body = await response.json();
  if (response.status !== 201) {
    console.log("Error with posting user");
    return Promise.reject(body);
  }
  return body;
}

async function createUserAPI(data) {
  const response = await fetch(proxy + "/api/users/create-user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  });
  const res = await response.json();
  if (!response.ok) {
    return Promise.reject(res);
  }
  return res;
}

export { updateReviewAPI, updateStackedAPI, updateUserAPI, createUserAPI };
