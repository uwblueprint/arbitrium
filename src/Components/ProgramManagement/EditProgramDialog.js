import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import LoadingOverlay from "../Common/LoadingOverlay";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { updateProgramNameAPI, createProgramAPI } from "../../requests/update";

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

function EditProgramDialog({
  close,
  userId = "",
  orgId = "",
  program = null,
  newProgram = false,
  duplicate = false,
  reloadPrograms
}) {
  const [programName, setProgramName] = useState(program ? program.name : "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateProgramName = () => (event) => {
    setProgramName(event.target.value);
  };

  async function createProgram() {
    if (programName.length === 0) return;
    setIsSubmitting(true);
    try {
      const newProgram = {
        createdByUserId: userId,
        organization: orgId,
        databaseName: null,
        displayName: programName,
        appVersion: 2,
        deleted: false,
        archived: false
      };
      await createProgramAPI(newProgram);
      reloadPrograms({ userId });

      close();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
    }
  }

  async function renameProgram() {
    if (programName.length === 0) return;
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

  async function duplicateProgram() {
    setIsSubmitting(true);
    try {
      //TODO: Finish later
      // const newProgram = {
      //   createdByUserId: userId,
      //   organization: orgId,
      //   databaseName: null,
      //   displayName: programName,
      //   appVersion: 2,
      //   deleted: false,
      //   archived: false
      // };
      // let result = await createProgramAPI(newProgram);
      // console.log(result);
      //await duplicateProgram(program.id);
      close();
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      close();
    }
  }

  return (
    <Wrapper>
      <Dialog width="400px" paddingHorizontal={28} paddingVertical={28}>
        <DialogHeader
          onClose={close}
          title={
            newProgram
              ? "New program"
              : duplicate
              ? "Duplicate program"
              : "Rename program"
          }
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
            error={programName.length === 0}
            fullWidth
            required
            value={programName}
            onChange={updateProgramName()}
          />
        </QuestionWrapper>
        <Button
          className="createButton"
          onClick={
            newProgram
              ? createProgram
              : duplicate
              ? duplicateProgram
              : renameProgram
          }
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
