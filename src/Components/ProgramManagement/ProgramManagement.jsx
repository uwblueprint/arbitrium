import React, { useMemo, useContext, useState } from "react";
import Spinner from "react-spinner-material";
import styled from "styled-components";
import usePromise from "../../Hooks/usePromise";
import * as GET from "../../requests/get";
import ProgramManagementTable from "./ProgramManagementTable";
import DialogTriggerButton from "../Common/Dialogs/DialogTriggerButton";
import NewProgramDialog from "./NewProgramDialog";
import { AuthContext } from "../../Authentication/Auth";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { makeStyles } from "@material-ui/core/styles";
import { rolesMap } from "../../Constants/UserRoles";

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

const useStyles = makeStyles({
  content: {
    marginTop: -16
  },
  action_menu: {
    boxShadow:
      "0px 8px 10px rgba(0, 0, 0, 0.14), 0px 3px 14px rgba(0, 0, 0, 0.12), 0px 5px 5px rgba(0, 0, 0, 0.2)",
    borderRadius: "4px",
    width: "158px"
  },
  action_menu_content: {
    paddingTop: "8px",
    paddingBottom: "8px"
  },
  action_menu_item: {
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.87)",
    lineHeight: "20px",
    letterSpacing: "0.25px"
  }
});

function ProgramManagement() {
  const { currentUser, appUser } = useContext(AuthContext);
  const userId = appUser.userId;
  const [programs, reloadPrograms] = usePromise(
    GET.getAllUserProgramsAPI,
    { userId },
    []
  );
  const [programMenuAnchorEl, setProgramMenuAnchorEl] = useState(null);
  const classes = useStyles();

  const programsData = useMemo(
    () =>
      convertToTableData(
        programs.value.filter((program) => {
          return !program.archived;
        })
      ),
    [programs]
  );

  const archivedProgramsData = useMemo(
    () =>
      convertToTableData(
        programs.value.filter((program) => {
          return program.archived;
        })
      ),
    [programs]
  );

  const handleAnchorClick = (event) => {
    console.log(event.currentTarget);
    setProgramMenuAnchorEl(event.currentTarget);
  };

  // convert fetched users to table format
  // fetched: array
  function convertToTableData(programs) {
    return programs.map((program) => {
      return {
        name: program.name,
        organization: program.organization,
        role: rolesMap[program.role],
        archived: program.archived,
        // status: "To Do",
        // TODO: update user's currentProgram
        link: (
          <div className="button-container">
            <a href={"/admin/applications"}>
              <Button
                variant="contained"
                color="primary"
                target="_blank"
                value="OpenApplication"
              >
                View
              </Button>
            </a>
            <IconButton
              aria-label="actions"
              aria-controls="actions-menu"
              onClick={(e) => handleAnchorClick(e)}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
        )
      };
    });
  }
  console.log(programMenuAnchorEl);
  return (
    <div>
      <Wrapper>
        {!programs.isPending ? (
          <>
            <Header>
              <h1 style={{ color: "black" }}>Programs</h1>
              {appUser.adminOrganization && (
                <div className="button-container">
                  <DialogTriggerButton
                    Dialog={NewProgramDialog}
                    dialogProps={{
                      userId: userId,
                      orgId: appUser.adminOrganization
                    }}
                    closeOnEsc={true}
                  >
                    Add New
                  </DialogTriggerButton>
                </div>
              )}
            </Header>
            <ProgramManagementTable
              data={programsData}
              alertParent={reloadPrograms}
            />
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
            <ProgramManagementTable
              data={archivedProgramsData}
              alertParent={reloadPrograms}
            />
          </>
        ) : (
          <>
            <h4>Loading Users...</h4>
            <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
          </>
        )}
      </Wrapper>
      <Menu
        id="actions-menu"
        classes={{
          paper: classes.action_menu,
          list: classes.action_menu_content
        }}
        anchorEl={programMenuAnchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        keepMounted
        open={Boolean(programMenuAnchorEl)}
        onClose={() => setProgramMenuAnchorEl(null)}
      >
        <MenuItem
          classes={{ root: classes.action_menu_item }}
          onClick={() => {}}
        >
          Move section
        </MenuItem>
        <MenuItem
          classes={{ root: classes.action_menu_item }}
          onClick={() => {}}
        >
          Delete section
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ProgramManagement;
