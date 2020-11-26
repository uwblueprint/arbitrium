import React from "react";
import DialogOverlay from "./DialogOverlay";

function ControlledDialogTrigger({ showDialog, Dialog, dialogProps }) {
  return (
    showDialog && (
      <>
        <DialogOverlay />
        <Dialog {...dialogProps} />
      </>
    )
  );
}

export default ControlledDialogTrigger;
