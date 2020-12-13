import React, { useMemo } from "react";
import Spinner from "react-spinner-material";
import styled from "styled-components";
import usePromise from "../../Hooks/usePromise";
import * as GET from "../../requests/get";
import DialogTriggerButton from "../Common/Dialogs/DialogTriggerButton";
import EditUserDialog from "./EditUserDialog";
import NewUserDialog from "./NewUserDialog";
import UserManagementTable from "./UserManagementTable";
import { connect } from "react-redux";
import * as userRoles from "../../Constants/UserRoles";

const rolesMap = {
  ADMIN: "Admin",
  ADMIN_REVIEWER: "Admin and Reviewer",
  REVIEWER: "Reviewer",
  GUEST: "Guest"
};

const Wrapper = styled.div`
  margin-top: 50px;
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
// fetched: array
function convertToTableData(fetched, programId) {
  return fetched.map((user) => ({
    name: user.name,
    email: user.email,
    role: user.role,
    userLink: (
      <div className="button-container">
        <DialogTriggerButton
          Dialog={EditUserDialog}
          closeOnEsc={true}
          variant="outlined"
          dialogProps={{ data: user, programId: programId }}
        >
          Edit
        </DialogTriggerButton>
      </div>
    )
  }));
}

function UserManagement({ programId }) {
  const [loadUsers, reloadUsers] = usePromise(
    GET.getAllProgramUsersAPI,
    programId,
    [programId]
  );

  const users = useMemo(
    () =>
      convertToTableData(
        loadUsers.value.filter((u) => !u.deleted),
        programId
      ),
    [loadUsers, programId]
  );

  return (
    <Wrapper>
      {!loadUsers.isPending ? (
        <>
          <Header>
            <h1 style={{ color: "black" }}>Manage User Access</h1>
            <div className="button-container">
              <DialogTriggerButton
                Dialog={NewUserDialog}
                closeOnEsc={true}
                alertParent={reloadUsers}
                dialogProps={{ programId: programId }}
              >
                Add new user
              </DialogTriggerButton>
            </div>
          </Header>
          <UserManagementTable data={users} alertParent={reloadUsers} />
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

const mapStateToProps = (state) => ({
  programId: state.program
});

export default connect(mapStateToProps)(UserManagement);
