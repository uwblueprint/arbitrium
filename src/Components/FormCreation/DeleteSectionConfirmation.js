import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";

const WarningMessage = styled.div`
  p {
    font-size: 12px;
  }
  margin-bottom: 10px;
`;

const ButtonWrapper = styled.div`
  float: right;
  button {
    text-transform: none;
  }
`;

function DeleteSectionConfirmation({
  close,
  confirm,
  sectionName,
  questionCount
}) {
  return (
    <Dialog width="400px" paddingHorizontal={28} paddingVertical={28}>
      <DialogHeader
        onClose={close}
        title={'Are you sure you want to delete "' + sectionName + '"?'}
      />
      <hr></hr>
      <WarningMessage>
        <p>
          "{sectionName}" has {questionCount}{" "}
          {questionCount == 1 ? "question" : "questions"} in it, which will also
          be deleted.
        </p>
      </WarningMessage>
      <ButtonWrapper>
        <Button
          onClick={close}
          href="#text-buttons"
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
          href="#text-buttons"
          color="primary"
          style={{ marginLeft: "8px" }}
        >
          Delete
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
}

export default DeleteSectionConfirmation;
