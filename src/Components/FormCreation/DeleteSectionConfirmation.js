import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";

const Header = styled.div`
  display: flex;
  padding-bottom: 14px;
  color: black;
  margin: 0;
  font-weight: bold;
  font-size: 14px;
  display: inline-block;
`;

const WarningMessage = styled.div`
  p {
    font-size: 14px;
  }
  margin-bottom: 16px;
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
  const dialogRef = React.createRef();

  useEffect(() => {
    function detectEscape(event) {
      if (event.keyCode === 27) {
        close();
      }
    }

    function detectOutsideClicks(event) {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        close();
      }
    }

    if (dialogRef.current) {
      window.addEventListener("keydown", detectEscape);
      window.addEventListener("mousedown", detectOutsideClicks);
    }
  }, [close, dialogRef]);

  return (
    <Dialog
      ref={dialogRef}
      width="600px"
      paddingHorizontal={28}
      paddingVertical={28}
    >
      <Header>Are you sure you want to delete "{sectionName}"?</Header>
      <WarningMessage>
        <p>
          "{sectionName}" has {questionCount}{" "}
          {questionCount === 1 ? "question" : "questions"} in it, which will
          also be deleted.
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
