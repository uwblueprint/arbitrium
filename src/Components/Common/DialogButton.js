import React, { useEffect, useState, useCallback } from "react";

import Button from "@material-ui/core/Button";
import styled from "styled-components";

const DialogOverlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  height: 100vh;
  width: 100vw;
  z-index: 110;
  background: rgba(0, 0, 0, 0.5);
`;

function DialogButton({
  children,
  closeOnEsc,
  color,
  Dialog,
  dialogProps,
  onClose,
  variant
}) {
  const [showDialog, setShowDialog] = useState(false);
  const dialogRef = React.createRef();

  const closeDialog = useCallback(() => {
    setShowDialog(false);
    onClose && onClose();
  }, [onClose]);

  useEffect(() => {
    function detectEscape(event) {
      if (closeOnEsc && event.keyCode === 27) {
        closeDialog();
      }
    }
    if (dialogRef.current) {
      window.addEventListener("keydown", detectEscape);
    }
  }, [closeDialog, closeOnEsc, dialogRef, onClose]);

  function onClick() {
    setShowDialog(true);
    dialogRef.current.focus();
  }

  return (
    <div className="button-container" ref={dialogRef}>
      <Button
        onClick={onClick}
        color={color || "primary"}
        variant={variant || "contained"}
      >
        {children}
      </Button>
      {showDialog && (
        <>
          <DialogOverlay />
          <Dialog {...dialogProps} close={closeDialog} />
        </>
      )}
    </div>
  );
}

export default DialogButton;
