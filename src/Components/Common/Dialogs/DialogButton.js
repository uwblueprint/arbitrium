import React, { useEffect, useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

// TODO: fix height issue, currently setting to 150% as hacky fix
const DialogOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 150%;
  width: 100vw;
  z-index: 110;
  background: rgba(0, 0, 0, 0.5);
`;

function DialogTriggerButton({
  children,
  closeOnEsc,
  color,
  Dialog,
  dialogProps,
  variant,
  customBgColor,
  alertParent,
  data
}) {
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = React.createRef();

  const closeDialog = useCallback(() => {
    setShowDialog(false);
  }, []);

  useEffect(() => {
    function detectEscape(event) {
      if (closeOnEsc && event.keyCode === 27) {
        closeDialog();
      }
    }
    if (dialogRef.current) {
      window.addEventListener("keydown", detectEscape);
    }
  }, [closeDialog, closeOnEsc, dialogRef]);

  function onClick() {
    setShowDialog(true);
    dialogRef.current.focus();
  }

  // TODO: find better way to specify custom button colour
  return (
    <div className="button-container" ref={dialogRef}>
      <Button
        onClick={onClick}
        color={color || "primary"}
        variant={variant || "contained"}
        style={
          customBgColor
            ? {
                backgroundColor: `${customBgColor}`,
                color: "#FFFFFF"
              }
            : {}
        }
      >
        {children}
      </Button>
      {showDialog && (
        <>
          <DialogOverlay />
          <Dialog
            {...dialogProps}
            close={closeDialog}
            confirm={alertParent}
            data={data}
          />
        </>
      )}
    </div>
  );
}

export default DialogTriggerButton;
