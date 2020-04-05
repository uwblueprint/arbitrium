import React, { useEffect, useState } from "react";
import UserManagementTable from "./UserManagementTable";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Spinner from 'react-spinner-material';
const GET = require("../../requests/get");

/*
var admin = require('firebase-admin');
var serviceAccount = require('./firebaseAdmin.json');

let firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_FIREBASE_ADMIN_DATABASE_URL
})
*/


const Wrapper = styled.div`
  margin-top: 148px;
  text-align: left;
  padding: 0 64px;
  .header {
    display: flex;
    align-items: center;
    h1 {
      font-size: 24px;
      font-weight: normal;
      font-size: 24px;
      display: inline-block;
      margin-right: auto;
    }
    .button-container {
      display: inline-block;
    }
    button {
      height: fit-content;
      margin-top: auto;
      margin-bottom: auto;
    }
  }
`;

// Moock data
const users2 = new Array(30).fill(0).map((elem, index) => ({
  name: `${index} blah blah`,
  email: "blah.com",
  role: "Admin",
  programAccess: ["SVP Investee Grant", "SVP Teens", "another"],
  userLink: (
    <Button variant="outlined" color="primary">
      Edit
    </Button>
  )
}));

/*
function listAllUsers(nextPageToken) {
  // List batch of users, 1000 at a time.
  firebaseAdmin.auth().listUsers(1000, nextPageToken)
    .then(function(listUsersResult) {
      listUsersResult.users.forEach(function(userRecord) {
        console.log('user', userRecord.toJSON());
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
        listAllUsers(listUsersResult.pageToken);
      }
    })
    .catch(function(error) {
      console.log('Error listing users:', error);
    });
}
*/


function UserManagement() {

  const [users, setUsers ] = useState(null);

  let users3 = []
  useEffect(() => {
    GET.getAllUsersAPI().then(res => {
      if (Array.isArray(res)) setUsers(res);
    });
  }, []);

  //Convert data into a format used by the table
  let userList = []
  if (users != null) {
    users.forEach(user => {
      let programs = []
      if (user.programs != null){
        user.programs.forEach(program => {
          programs.push(program.name)
        })
      }
      userList.push({
        name: user.name,
        email: user.email,
        programAccess: programs,
        role: "none",
        userLink: (
          <Button variant="outlined" color="primary">
            Edit
          </Button>
        )
      })

    })
  }

  console.log("rendering")
  console.log(users)

  return (
    <div>
    { userList.length != 0 && users != null  ? (
      <Wrapper>
        <div className="header">
          <h1>User Management</h1>
          <div className="button-container">
            <Button color="primary" variant="contained">
              Create New User
            </Button>
          </div>
        </div>
        <UserManagementTable data={userList} />
      </Wrapper>
    ) : (
      <div>
        <h1>Loading Users...</h1>
        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
      </div>
    )
  }
  </div>
  );
}
export default UserManagement;
