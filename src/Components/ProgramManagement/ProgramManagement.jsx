import React, { useMemo } from "react";
import Spinner from "react-spinner-material";
import styled from "styled-components";
import usePromise from "../../Hooks/usePromise";
import * as GET from "../../requests/get";
import ProgramManagementTable from "./ProgramManagementTable";

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
function convertToTableData(fetched, programs) {
  return fetched.map((user) => ({
    name: user.name,
    email: user.email,
    programAccess: (user.programs || [])
      .filter((p) => programs.find((prog) => prog._id === p.id))
      .map((p) => p.displayName),
    role: user.admin ? "Admin" : "Reviewer",
    userLink: (
      <div className="button-container">
        {/*}
        <DialogTriggerButton
          Dialog={EditUserDialog}
          closeOnEsc={true}
          variant="outlined"
          dialogProps={{ data: user }}
        >
          Edit
        </DialogTriggerButton>
        */}
      </div>
    )
  }));
}

function ProgramManagement() {
  const [loadUsers, reloadUsers] = usePromise(GET.getAllUsersAPI, {}, []);
  const [programs, reloadPrograms] = usePromise(GET.getAllProgramsAPI, {}, []);
  //Get organizations

  const users = useMemo(
    () =>
      convertToTableData(
        loadUsers.value.filter((u) => !u.deleted),
        programs.value
      ),
    [loadUsers, programs]
  );

  return (
    <Wrapper>
      {!loadUsers.isPending ? (
        <>
          <Header>
            <h1 style={{ color: "black" }}>Programs</h1>
            <div className="button-container">
              {/*}
              <DialogTriggerButton
                Dialog={}
                closeOnEsc={true}
                alertParent={reloadUsers}
              >
                Add New
              </DialogTriggerButton>
              */}
            </div>
          </Header>
          <ProgramManagementTable data={users} alertParent={reloadUsers} />
          <Header>
            <h1 style={{ color: "black" }}>Archives</h1>
            <div className="button-container">
              {/*}
              <DialogTriggerButton
                Dialog={}
                closeOnEsc={true}
                alertParent={reloadUsers}
              >
                Add New
              </DialogTriggerButton>
              */}
            </div>
          </Header>
          <ProgramManagementTable data={users} alertParent={reloadUsers} />
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

export default ProgramManagement;
