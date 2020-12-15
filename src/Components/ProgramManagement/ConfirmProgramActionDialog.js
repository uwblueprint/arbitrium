import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";
import LoadingOverlay from "../Common/LoadingOverlay";
import { updateProgramArchivedAPI } from "../../requests/update";
import { deleteProgramAPI } from "../../requests/delete";

const actionMap = {
  ARCHIVE_PROGRAM: {
    message: (programName) => {
      return `You’re about to archive "${programName}". Users will still be able to access this program from the archived programs section.`;
    },
    action: (programId) => {
      updateProgramArchivedAPI(programId, { archived: true });
    }
  },
  UNARCHIVE_PROGRAM: {
    message: (programName) => {
      return `You’re about to un-archive "${programName}". This will allow users to edit their reviews.`;
    },
    action: (programId) => {
      updateProgramArchivedAPI(programId, { archived: false });
    }
  },
  DELETE_PROGRAM: {
    message: (programName) => {
      return `You’re about to permanently delete "${programName}". The form, submissions, and reviews will not be recoverable.`;
    },
    action: (programId) => {
      deleteProgramAPI(programId);
    }
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

function ConfirmProgramActionDialog({ close, program, action }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function commitAction() {
    setIsSubmitting(true);
    try {
      actionMap[action].action(program.id);
      close();
      window.location.reload();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog width="400px" paddingHorizontal={28} paddingVertical={28}>
      <DialogHeader onClose={close} title="Are you sure?" />
      <LoadingOverlay
        show={isSubmitting}
        spinnerProps={{
          radius: 120,
          stroke: 2
        }}
      />
      <WarningMessage>
        {action && actionMap[action].message(program.name)}
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
            commitAction();
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
