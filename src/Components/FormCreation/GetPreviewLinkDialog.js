import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";
import Close from "@material-ui/icons/Close";
import Lightbulb from "@material-ui/icons/EmojiObjectsOutlined";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";

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
  padding-bottom: 16px;
  color: rgba(0, 0, 0, 0.87);
  margin: 0;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  letter-spacing: 0.1px;
  padding-top: 6px;
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

function DeleteSectionConfirmation({ close, confirm }) {
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
      showClose={true}
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
      <Header
        style={{ lineHeight: "36px", fontSize: "24px", fontWeight: "400" }}
      >
        Get Preview Link
        <IconButton
          onClick={close}
          style={{
            display: "inline-block",
            marginLeft: "auto"
          }}
          size="small"
        >
          <Close />
        </IconButton>
      </Header>
      <WarningMessage>
        <Icon>
          <Lightbulb />
        </Icon>
      </WarningMessage>
      <ButtonWrapper>
        <Button
          onClick={close}
          href="#text-buttons"
          color="primary"
          style={{
            lineHeight: "16px",
            letterSpacing: "1.25px",
            textTransform: "none"
          }}
        >
          Open In New Window
        </Button>
        <Button
          onClick={() => {
            confirm();
            close();
          }}
          href="#text-buttons"
          variant="outlined"
          color="primary"
          style={{
            marginLeft: "23px",
            lineHeight: "16px",
            letterSpacing: "1.25px",
            textTransform: "none",
            border: "1px solid rgba(0, 0, 0, 0.33)"
          }}
        >
          Copy Link
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
}

export default DeleteSectionConfirmation;
