import React, { useEffect, useState } from "react";

import UserManagementTable from "./UserManagementTable";
import EditUserDialog from "./EditUserDialog";
import NewUserDialog from "./NewUserDialog";
import DialogButton from "../Common/DialogButton";

import styled from "styled-components";
import Spinner from "react-spinner-material";
import * as GET from "../../requests/get";

const Wrapper = styled.div`
  margin-top: 148px;
  text-align: left;
  padding: 0 64px;
`;

const Header = styled.div`
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
  }
  `;

// convert fetched users to table format
function convertToTableData(fetched) {
  const userList = [];
  if (fetched != null) {
    fetched.forEach((user) => {
      const programsList = [];
      if (user.programs != null) {
        user.programs.forEach((program) => {
          programsList.push(program.name);
        });
      }
      userList.push({
        name: user.name,
        email: user.email,
        programAccess: programsList,
        role: user.role,
        userLink: (
          <div className="button-container">
            <DialogButton
              Dialog={EditUserDialog}
              closeOnEsc={true}
              variant="outlined"
              data={user}
            >
              Edit
            </DialogButton>
          </div>
        )
      });
    });
  }
  return userList;
}

function UserManagement() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    //Option 2: Define an async function to call at the end of useEffect
    async function getUsers() {
      //Fetch the users from the backend
      const fetched = await GET.getAllUsersAPI();

      setUsers(convertToTableData(fetched));
    }

    getUsers();
  }, []);

  return (
    <Wrapper>
      {users != null ? (
        <>
          <Header>
            <h1>User Management</h1>
            <div className="button-container">
              <DialogButton Dialog={NewUserDialog} closeOnEsc={true}>
                Create New User
              </DialogButton>
            </div>
          </Header>
          <UserManagementTable data={users} />
        </>
      ) : (
        <>
          <h4>Loading Users...</h4>
          <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </>
      )}
    </Wrapper>
  );
}

//Take all firebase users and create an entry in mongo if one doesn't exist
// function seedDB() {
//   ADMIN.getAllFirebaseUsers().then(function(users) {
//     users.forEach((item) => {
//       let p = {
//         name: "SVP Investee Grant",
//         access: "regular user"
//       };
//       let programs = [];
//       programs.push(p);
//       let user = {
//         userId: item.uid,
//         name: "",
//         email: item.email,
//         role: "User",
//         programs: programs
//       };
//       //2 FACTOR AUTH. CONTACT GREG BEFORE UNCOMMENTING
//       //UPDATE.updateUserAPI(user)
//     });
//   });
// }

export default UserManagement;
