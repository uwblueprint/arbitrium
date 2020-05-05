import React, { useReducer } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { userFormStateReducer } from "./UserFormStateReducer";
import EditUserForm from "./EditUserForm";

const padding = "28px";
const Wrapper = styled.div`
  background: white;
  display: inline-block;
  left: 50%;
  margin: auto;
  padding: ${padding};
  position: fixed;
  top: 50%;
  width: 400px;
  z-index: 1000;

  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  -o-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);

  h4 {
    display: inline-block;
  }
`;

const Header = styled.div`
  display: flex;
  padding-bottom: ${padding};
  h4 {
    margin: 0;
    font-weight: normal;
    display: inline-block;
  }
`;

const useStyles = makeStyles({
  closeRoot: {
    display: "inline-block",
    marginLeft: "auto"
  }
});

const initialFormState = {
  name: "",
  preferredName: "",
  role: "member",
  programs: new Set()
};

// onAddNewUser: callback for when a new user is added
function NewUserDialog({ onSubmit, close }) {
  const [formState, dispatchUpdateFormState] = useReducer(
    userFormStateReducer,
    initialFormState
  );
  const styles = useStyles();

  function addNewUser(newUser) {
    // TODO
    onSubmit(newUser); // callback for dialog user }
  }

  return (
    <Wrapper>
      <Header>
        <h4>Create a new user</h4>
        <IconButton
          onClick={close}
          classes={{ root: styles.closeRoot }}
          size="small"
        >
          <Close />
        </IconButton>
      </Header>
      <EditUserForm formState={formState} dispatch={dispatchUpdateFormState} />
      <Button
        onClick={addNewUser}
        fullWidth
        variant="contained"
        color="primary"
      >
        Send Invitiation
      </Button>
    </Wrapper>
  );
}

export default NewUserDialog;
