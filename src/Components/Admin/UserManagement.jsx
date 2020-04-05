import React from "react";
import UserManagementTable from "./UserManagementTable";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const GET = require("../../requests/get");

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
const users = new Array(30).fill(0).map((elem, index) => ({
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



function UserManagement() {
  return (
    <Wrapper>
      <div className="header">
        <h1>User Management</h1>
        <div className="button-container">
          <Button color="primary" variant="contained">
            Create New User
          </Button>
        </div>
      </div>
      <UserManagementTable data={users} />
    </Wrapper>
  );
}
export default UserManagement;
