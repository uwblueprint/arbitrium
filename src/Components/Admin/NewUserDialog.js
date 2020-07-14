import React, { useReducer, useState } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";


import { userFormStateReducer } from "Reducers/UserFormStateReducer";
import EditUserForm from "./EditUserForm";
import LoadingOverlay from "../Common/LoadingOverlay";
import { createUserAPI } from "../../requests/update";

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
  email: "",
  role: "User",
  programs: new Set()
};

// onAddNewUser: callback for when a new user is added
function NewUserDialog({ onSubmit, close }) {
  const [formState, dispatchUpdateFormState] = useReducer(
    userFormStateReducer,
    initialFormState
  );

  const styles = useStyles();

  const [isSubmitting, setIsSubmitting] = useState(false);

  async function addNewUser() {
    setIsSubmitting(true);
    try {
      const data = { ...formState };
      data.programs = Array.from(formState.programs).map((p) => ({
        name: p,
        access: "regular user" // TODO: shouldn't this be a field in the user drawer UI
      }));
      const user = await createUserAPI(data);
      close();
      onSubmit && onSubmit(user);
    } catch (e) {
      console.error(e);
      if (e.code === "auth/email-already-exists") {
        alert(e.message);
      } else {
        alert("Something went wrong. User created unsuccessfully.");
      }
      setIsSubmitting(false);
    }
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
      <LoadingOverlay
        show={isSubmitting}
        spinnerProps={{
          radius: 120,
          stroke: 2
        }}
      />
      <EditUserForm formState={formState} dispatch={dispatchUpdateFormState} />
      <Button
        onClick={addNewUser}
        fullWidth
        variant="contained"
        color="primary"
        disabled={isSubmitting}
      >
        Send Invitiation
      </Button>
    </Wrapper>
  );
}

export default NewUserDialog;
