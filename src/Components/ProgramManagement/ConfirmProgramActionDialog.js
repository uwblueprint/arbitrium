import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";

const actionMap = {
  ARCHIVE_PROGRAM: (programName) => {
    return `You’re about to archive "${programName}". Users will still be able to access this program from the archived programs section.`;
  },
  UNARCHIVE_PROGRAM: (programName) => {
    return `You’re about to un-archive "${programName}". This will allow users to edit their reviews.`;
  },
  DELETE_PROGRAM: (programName) => {
    return `You’re about to permanently delete "${programName}". The form, submissions, and reviews will not be recoverable.`;
  }
};

const WarningMessage = styled.div`
  margin-bottom: 32px;
`;

const ButtonWrapper = styled.div`
  float: right;
  button {
    text-transform: none;
  }
`;

function ConfirmProgramActionDialog({ close, confirm, program, action }) {
  return (
    <Dialog width="400px" paddingHorizontal={28} paddingVertical={28}>
      <DialogHeader onClose={close} title="Are you sure?" />
      <WarningMessage>
        {action && actionMap[action](program.name)}
      </WarningMessage>
      <ButtonWrapper>
        <Button
          onClick={close}
          variant="outlined"
          color="primary"
          style={{ marginRight: "8px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={() => {
            confirm();
            close();
          }}
          variant="contained"
          color={"primary"}
          style={{ marginLeft: "8px" }}
        >
          Confirm
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
}

export default ConfirmProgramActionDialog;
