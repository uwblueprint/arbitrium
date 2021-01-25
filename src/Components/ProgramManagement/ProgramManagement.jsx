import React, { useCallback, useContext, useState } from "react";
import Spinner from "react-spinner-material";
import styled from "styled-components";
import usePromise from "../../Hooks/usePromise";
import { getAllUserProgramsAPI } from "../../requests/get";
import { updateUserProgramAPI } from "../../requests/update";
import ProgramManagementTable from "./ProgramManagementTable";
import DialogTriggerButton from "../Common/Dialogs/DialogTriggerButton";
import ControlledDialogTrigger from "../Common/Dialogs/DialogTrigger";
import EditProgramDialog from "./EditProgramDialog";
import ConfirmProgramActionDialog from "./ConfirmProgramActionDialog";
import { AuthContext } from "../../Authentication/Auth";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { makeStyles } from "@material-ui/core/styles";
import { rolesMap } from "../../Constants/UserRoles";
import { connect } from "react-redux";
import { loadProgram } from "../../Actions/index.js";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import {
  ARCHIVE_PROGRAM,
  UNARCHIVE_PROGRAM,
  DELETE_PROGRAM
} from "../../Constants/ActionTypes";

const Wrapper = styled.div`
  padding: 0 136px;
  margin-top: 50px;
  text-align: left;
  padding-bottom: 30px;
  table.MuiTable-root {
    border: 1px solid #cccccc;
  }
  button: {
    text-transform: none;
  }
`;

const ProgramMenuButtonWrapper = styled.div`
  button {
    margin-left: 8px;
    height: 36px;
    width: 36px;
  }
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
    paddingBottom: "8px",
    alignContent: "center"
  },
  action_menu_item: {
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.87)",
    lineHeight: "20px",
    letterSpacing: "0.25px"
  },
  optionsMenuItems: {
    display: "flex"
  }
});

function ProgramManagement({ history, program, loadProgram }) {
  const { appUser } = useContext(AuthContext);
  const userId = appUser.userId;
  const [programs, reloadPrograms] = usePromise(
    getAllUserProgramsAPI,
    { userId },
    [],
    [program]
  );
  const [showEditProgramDialog, setShowEditProgramDialog] = useState(false);
  const [showConfirmActionDialog, setShowConfirmActionDialog] = useState(false);
  const [currentProgram, setCurrentProgram] = useState(program);
  const [programAction, setProgramAction] = useState("");
  const [showOptionsMenu, setshowOptionsMenu] = useState(false);
  const [shouldDuplicate, setShouldDuplicate] = useState(false);
  const classes = useStyles();

  const handleAnchorClick = () => {
    setshowOptionsMenu(true);
  };

  const handleAnchorClose = () => {
    setshowOptionsMenu(false);
  };

  const openProgramMenu = useCallback((event, program) => {
    handleAnchorClick(event);
    setCurrentProgram(program);
  }, []);

  function closeEditProgramDialog() {
    setShowEditProgramDialog(false);
  }

  function closeConfirmActionDialog() {
    setShowConfirmActionDialog(false);
  }

  function getActivePrograms() {
    return programs.value.filter((program) => {
      return !program.archived;
    });
  }

  function getArchivedPrograms() {
    return programs.value.filter((program) => {
      return program.archived;
    });
  }

  const convertToTableData = useCallback(
    (programs) => {
      async function setUserProgram(newProgram) {
        await updateUserProgramAPI(userId, { programId: newProgram.id });
        loadProgram(newProgram.id);
      }
      return programs.map((program) => {
        return {
          name: program.name,
          organization: program.orgName,
          role: rolesMap[program.role],
          archived: program.archived,
          link: (
            <div style={{ display: "flex", float: "right" }}>
              <Button
                variant="contained"
                color="primary"
                value="OpenApplication"
                onClick={async function() {
                  program && (await setUserProgram(program));
                  history.push("/applications");
                }}
              >
                View
              </Button>
              <ProgramMenuButtonWrapper>
                {appUser.adminOrganization === program.orgId ? (
                  <IconButton
                    aria-label="actions"
                    aria-controls={"actions-menu"}
                    onClick={(e) => openProgramMenu(e, program)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                ) : (
                  <IconButton disabled={true}></IconButton>
                )}
              </ProgramMenuButtonWrapper>
            </div>
          ),
          options: (
            <>
              <ProgramMenuButtonWrapper>
                {appUser.adminOrganization === program.orgId && (
                  <IconButton
                    aria-label="actions"
                    aria-controls={"actions-menu"}
                    onClick={(e) => openProgramMenu(e, program)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                )}
              </ProgramMenuButtonWrapper>
            </>
          )
        };
      });
    },
    [loadProgram, userId, appUser, history, openProgramMenu]
  );

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
                    Dialog={EditProgramDialog}
                    dialogProps={{
                      userId: userId,
                      orgId: appUser.adminOrganization,
                      newProgram: true,
                      reloadPrograms: reloadPrograms
                    }}
                    closeOnEsc={true}
                  >
                    Add new
                  </DialogTriggerButton>
                </div>
              )}
            </Header>
            <ControlledDialogTrigger
              showDialog={showEditProgramDialog}
              Dialog={EditProgramDialog}
              dialogProps={{
                close: closeEditProgramDialog,
                userId: userId,
                orgId: appUser.adminOrganization,
                program: currentProgram,
                duplicate: shouldDuplicate,
                reloadPrograms: reloadPrograms
              }}
            />
            <ControlledDialogTrigger
              showDialog={showConfirmActionDialog}
              Dialog={ConfirmProgramActionDialog}
              dialogProps={{
                close: closeConfirmActionDialog,
                action: programAction,
                program: currentProgram
              }}
            />
            <ProgramManagementTable
              data={convertToTableData(getActivePrograms())}
              alertParent={reloadPrograms}
            />
            <Header>
              <h1 style={{ color: "black" }}>Archives</h1>
              <div className="button-container"></div>
            </Header>
            <ProgramManagementTable
              data={convertToTableData(getArchivedPrograms())}
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
      <Dialog
        onClose={handleAnchorClose}
        aria-labelledby="simple-dialog-title"
        open={showOptionsMenu}
      >
        <DialogTitle style={{ float: "right" }} id="simple-dialog-title">
          Select Option
        </DialogTitle>
        <List style={{ display: "flex" }}>
          <ListItem>
            <Button
              classes={{ root: classes.action_menu_item }}
              onClick={() => {
                handleAnchorClose();
                setShowEditProgramDialog(true);
              }}
            >
              Rename
            </Button>
          </ListItem>
          <ListItem>
            <Button
              disabled={true}
              classes={{ root: classes.action_menu_item }}
              onClick={() => {
                handleAnchorClose();
                setShouldDuplicate(true);
                setShowEditProgramDialog(true);
              }}
            >
              Duplicate
            </Button>
          </ListItem>
          <ListItem>
            <Button
              classes={{ root: classes.action_menu_item }}
              onClick={() => {
                handleAnchorClose();
                setShowConfirmActionDialog(true);
                setProgramAction(
                  !currentProgram.archived ? ARCHIVE_PROGRAM : UNARCHIVE_PROGRAM
                );
              }}
            >
              {currentProgram && !currentProgram.archived
                ? "Archive"
                : "Unarchive"}
            </Button>
          </ListItem>
          <ListItem>
            <Button
              classes={{ root: classes.action_menu_item }}
              onClick={() => {
                handleAnchorClose();
                setShowConfirmActionDialog(true);
                setProgramAction(DELETE_PROGRAM);
              }}
            >
              Delete
            </Button>
          </ListItem>
        </List>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  program: state.program
});

const mapDispatchToProps = {
  loadProgram
};

const connectedAuth = connect(
  mapStateToProps,
  mapDispatchToProps
)(ProgramManagement);

export default connectedAuth;
