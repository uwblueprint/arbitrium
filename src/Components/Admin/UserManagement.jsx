import React, { useEffect, useState } from "react";

import UserManagementTable from "./UserManagementTable";
import NewUserDialog from "./NewUserDialog";
import DialogButton from "../Common/DialogButton";

import Button from "@material-ui/core/Button";
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
  if (fetched == null) return [];
  return fetched.map((user) => ({
    name: user.name,
    email: user.email,
    programAccess: user.programs.map((p) => p.name),
    role: user.role,
    userLink: (
      <Button variant="outlined" color="primary">
        Edit
      </Button>
    )
  }));
}

function UserManagement() {
  const [users, setUsers] = useState(null);

  useEffect(() => {
    // Define an async function since callback must be synchronous
    async function getUsers() {
      // Fetch the users from the backend
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

export default UserManagement;
