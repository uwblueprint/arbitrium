import firebaseApp from "../Authentication/firebase";

let proxy = "http://localhost:4000";
if (process.env.REACT_APP_NODE_ENV === "production") {
  proxy = process.env.REACT_APP_SERVER_PROD;
}
if (process.env.REACT_APP_NODE_ENV === "qa") {
  proxy = process.env.REACT_APP_SERVER_QA;
}

//This local variable is updated via redux action (LOAD_PROGRAM)
//Middleware in the store grabs the new program before it goes to the reducer
let program = null;

function setProgram(prog) {
  program = prog;
}

//Uses a service account to grab a token that lasts for 1-hour
async function getTempToken() {
  return await fetch(
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=" +
      process.env.REACT_APP_FIREBASE_KEY,
    {
      method: "POST",
      body: JSON.stringify({
        email: process.env.REACT_APP_SERVICE_EMAIL,
        password: process.env.REACT_APP_SERVICE_PASSWORD,
        returnSecureToken: "true"
      }),
      headers: {
        Accept: "application/json"
      }
    }
  )
    .then((result) => {
      return result.json();
    })
    .then((res) => {
      return res.idToken;
    });
}

async function GET(url, filepath = "", requiresAuth = true) {
  let token = "";
  if (requiresAuth) {
    token = await firebaseApp.auth().currentUser.getIdToken();
  }

  const response = await fetch(proxy + url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "application/json",
      database: program,
      filepath: filepath || ""
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function POST(url, databody, requiresAuth = true) {
  let token = "";
  if (requiresAuth) {
    token = await firebaseApp.auth().currentUser.getIdToken();
  }

  const response = await fetch(proxy + url, {
    method: "POST",
    body: JSON.stringify(databody),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      database: program
    }
  });

  const body = response.json();
  if (!response.ok) {
    const err = await body;
    throw Error(err.message);
  }
  return body;
}

async function PUT(url, databody, requiresAuth = true) {
  let token = "";
  if (requiresAuth) {
    token = await firebaseApp.auth().currentUser.getIdToken();
  }

  const response = await fetch(proxy + url, {
    method: "PUT",
    body: JSON.stringify(databody),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      database: program
    }
  });

  const body = response.json();
  if (!response.ok) {
    throw Error(body.message);
  }
  return body;
}

async function PATCH(url, databody, requiresAuth = true) {
  let token = "";
  if (requiresAuth) {
    token = await firebaseApp.auth().currentUser.getIdToken();
  }

  const response = await fetch(proxy + url, {
    method: "PATCH",
    body: JSON.stringify(databody),
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      database: program
    }
  });
  const body = response.json();
  if (!response.ok) {
    throw Error(body.message);
  }
  return body;
}

async function DELETE(url, filepath, requiresAuth = true) {
  let token = "";
  if (requiresAuth) {
    const currentUser = await firebaseApp.auth().currentUser;
    if (!currentUser) {
      token = await getTempToken();
    } else {
      token = await currentUser.getIdToken();
    }
  }

  const response = await fetch(proxy + url, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      database: program,
      filepath: filepath
    }
  });

  const body = response.json();
  if (!response.ok) {
    throw Error(body.message);
  }
  return body;
}

async function FILE(url, databody, filepath) {
  const currentUser = await firebaseApp.auth().currentUser;
  let token = "";
  if (!currentUser) {
    token = await getTempToken();
  } else {
    token = await currentUser.getIdToken();
  }

  const response = await fetch(proxy + url, {
    method: "POST",
    body: databody,
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      filepath: filepath
    }
  });

  const body = response.json();
  if (!response.ok) {
    const err = await body;
    throw Error(err.message);
  }
  return body;
}

export { PUT, GET, POST, PATCH, DELETE, FILE, setProgram };
