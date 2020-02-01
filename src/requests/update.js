const proxy =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_SERVER
    : "http://localhost:4000";

async function updateReviewAPI(databody) {
  console.log("Calling updateReviewAPI")
  console.log(databody)
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
    console.log(response);
    console.log("Error with posting ratings");
  }
  console.log(body);
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
    console.log(response);
    console.log("Error with posting stacked ranking");
  }
  console.log(body);
  return body;
}

exports.updateReviewAPI = updateReviewAPI;
exports.updateStackedAPI = updateStackedAPI;
