import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";

const WarningMessage = styled.div`
  p {
    font-size: 12px;
  }
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  float: right;
`;

function DeleteUserConfirmation({ close, confirm }) {
  return (
    <Dialog>
      <DialogHeader onClose={close} title="Are you sure?" />
      <hr></hr>
      <WarningMessage>
        <p>
          You are about to delete a user. Once you perform this action, all data
          associated to the account will be permanently erased.
        </p>
      </WarningMessage>
      <ButtonWrapper>
        <Button
          onClick={close}
          variant="outlined"
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
          variant="contained"
          style={{
            backgroundColor: "#C94031",
            color: "#FFFFFF",
            marginLeft: "8px"
          }}
        >
          Delete user
        </Button>
      </ButtonWrapper>
    </Dialog>
  );
}

export default DeleteUserConfirmation;
