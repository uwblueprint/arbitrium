import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import LoadingOverlay from "../Common/LoadingOverlay";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import {
  // createProgramAPI,
  updateProgramNameAPI
} from "../../requests/update";

const StyledLabel = styled(InputLabel)`
  margin-bottom: 4px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 16px;
`;

const Wrapper = styled.div`
  .createButton {
    text-transform: none;
  }
`;

// onAddNewUser: callback for when a new user is added
function EditProgramDialog({
  close,
  // eslint-disable-next-line no-unused-vars
  userId = "",
  // eslint-disable-next-line no-unused-vars
  orgId = "",
  program = null,
  newProgram = false
}) {
  const [programName, setProgramName] = useState(program ? program.name : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProgramName = () => (event) => {
    setProgramName(event.target.value);
  };

  async function createProgram() {
    setIsSubmitting(true);
    try {
      // console.log(`${programName} created by ${userId} for org ${orgId}`);
      close();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  }

  async function renameProgram() {
    setIsSubmitting(true);
    try {
      updateProgramNameAPI(program.id, { name: programName });
      close();
      window.location.reload();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  }

  return (
    <Wrapper>
      <Dialog width="400px" paddingHorizontal={28} paddingVertical={28}>
        <DialogHeader
          onClose={close}
          title={newProgram ? "New program" : "Rename program"}
        />
        <LoadingOverlay
          show={isSubmitting}
          spinnerProps={{
            radius: 120,
            stroke: 2
          }}
        />
        <QuestionWrapper>
          <StyledLabel htmlFor="program-name-input">Name</StyledLabel>
          <OutlinedInput
            id="program-name-input"
            fullWidth
            value={programName}
            onChange={updateProgramName()}
          />
        </QuestionWrapper>
        <Button
          className="createButton"
          onClick={newProgram ? createProgram : renameProgram}
          fullWidth
          variant="contained"
          color="primary"
          disabled={isSubmitting}
        >
          {newProgram ? "Create" : "Save"}
        </Button>
      </Dialog>
    </Wrapper>
  );
}

export default EditProgramDialog;
