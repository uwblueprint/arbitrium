import React, { useEffect, useState, useCallback } from "react";
import Button from "@material-ui/core/Button";
import DialogOverlay from "./DialogOverlay";

function DialogTriggerButton({
  children,
  closeOnEsc,
  color,
  Dialog,
  dialogProps,
  customBgColor,
  alertParent,
  variant
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

  return (
    <div className="button-container" ref={dialogRef}>
      <Button
        className="dialogButton"
        onClick={onClick}
        color={color || "primary"}
        variant={variant || "contained"}
        style={{
          backgroundColor: customBgColor && `${customBgColor}`,
          color: customBgColor && "#FFFFFF",
          textTransform: "none"
        }}
      >
        {children}
      </Button>
      {showDialog && (
        <>
          <DialogOverlay />
          <Dialog {...dialogProps} confirm={alertParent} close={closeDialog} />
        </>
      )}
    </div>
  );
}

export default DialogTriggerButton;
