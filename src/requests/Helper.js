import { getProgram, initialAppLoad } from "../Actions";


let proxy = "http://localhost:4000";
if (process.env.REACT_APP_NODE_ENV === "production") {
  proxy = process.env.REACT_APP_SERVER_PROD;
}
if (process.env.REACT_APP_NODE_ENV === "qa") {
  proxy = process.env.REACT_APP_SERVER_QA;
}

//This local variable is updated via redux action (LOAD_PROGRAM)
//Middleware in the store grabs the new program before it goes to the reducer
let program = window.location.pathname.split("/")[1]

function setProgram(prog){
  console.log("Setting the program")
  console.log(prog)
  program = prog._id
}

async function GET(url) {
  //Get the program from the url - we will pass this in the url and the
  //backend will query the corresponding database

  const response = await fetch(proxy + url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      database: program
    }
  });
  const body = await response.json();
  if (response.status !== 200) {
    throw Error(body.message);
  }
  return body;
}

async function POST(url, databody) {
  //Get the program from the url - we will pass this in the url and the
  //backend will query the corresponding database
  //let program = window.location.pathname.split("/")[0]

  const response = await fetch(proxy + url, {
    method: "POST",
    body: JSON.stringify(databody),
    headers: {
      Accept: "application/json",
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

export { GET, POST, setProgram };
