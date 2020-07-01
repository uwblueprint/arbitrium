import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import { Wrapper } from "./DialogWrappers";

const WarningMessage = styled.div`
  p {
    font-size: 12px;
  }
  margin-bottom: 16px;
`;

const ButtonWrapper = styled.div`
  float: right;
`;

const useStyles = makeStyles({
  closeRoot: {
    display: "inline-block",
    marginLeft: "auto",
    float: "right"
  }
});

function DeleteUserConfirmation({ close, confirm }) {
  const styles = useStyles();
  return (
    <Wrapper>
      <h4>Are you sure?</h4>
      <IconButton
        onClick={close}
        classes={{ root: styles.closeRoot }}
        size="small"
      >
        <Close />
      </IconButton>
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
    </Wrapper>
  );
}

export default DeleteUserConfirmation;
