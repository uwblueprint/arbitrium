import React, { useReducer, useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import LoadingOverlay from "../Common/LoadingOverlay";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";

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
function NewProgramDialog({
  onSubmit,
  close,
  confirm,
  userId,
  orgId,
  newProgram = true
}) {
  const [programName, setProgramName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProgramName = () => (event) => {
    setProgramName(event.target.value);
  };

  const createProgram = () => (event) => {
    setIsSubmitting(true);
    try {
      console.log(`${programName} created by ${userId} for org ${orgId}`);
      close();
    } catch (e) {
      setIsSubmitting(false);
    }
  };

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
            onChange={updateProgramName()}
          />
        </QuestionWrapper>
        <Button
          className="createButton"
          onClick={createProgram()}
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

export default NewProgramDialog;
