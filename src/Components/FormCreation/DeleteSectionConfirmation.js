import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";

const Header = styled.div`
  display: flex;
  padding-bottom: 16px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-top: 6px;
`;

const WarningMessage = styled.div`
  display: flex;
  p {
    margin: 0px;
    padding: 0px;
    font-size: 14px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.25px;
  }
`;

const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 18px;
  right: 19px;
  button {
    text-transform: none;
    font-weight: 500;
    font-size: 14px;
    text-transform: uppercase;
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

  const header_text = 'Are you sure you want to delete "' + sectionName + '"?';
  return (
    <Dialog
      ref={dialogRef}
      width="640px"
      paddingHorizontal={28}
      paddingVertical={28}
      style={{
        width: "640px",
        height: "100px",
        boxShadow:
          "0px 24px 38px rgba(0, 0, 0, 0.14), 0px 9px 46px rgba(0, 0, 0, 0.12), 0px 11px 15px rgba(0, 0, 0, 0.2)",
        borderRadius: "4px",
        padding: "18px"
      }}
    >
      <Header>{header_text}</Header>
      <WarningMessage>
        <p style={{ color: "rgba(0, 0, 0, 0.6)" }}>
          {`"` + sectionName + `"`} has {questionCount}{" "}
          {questionCount === 1 ? "question" : "questions"} in it, which will
          also be deleted.
        </p>
      </WarningMessage>
      <ButtonWrapper>
        <Button
          onClick={close}
          href="#text-buttons"
          color="primary"
          style={{
            padding: "0px",
            marginRight: "0px",
            lineHeight: "16px",
            letterSpacing: "1.25px"
          }}
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
          style={{
            padding: "0px",
            marginLeft: "22px",
            lineHeight: "16px",
            letterSpacing: "1.25px"
          }}
        >
          Delete
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
}

export default DeleteSectionConfirmation;
