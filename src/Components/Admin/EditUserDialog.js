import React, { useReducer } from "react";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";
import Close from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { userFormStateReducer } from "./UserFormStateReducer";
import EditUserForm from "./EditUserForm";
import DeleteUser from "./DeleteUser";
import * as UPDATE from "../../requests/update";

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
  max-height: 95%;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const Header = styled.div`
  display: flex;
  padding-bottom: ${padding};
  h4 {
    margin: 0;
    font-weight: normal;
    display: inline-block;
    font-size: calc(0.3vh + 0.5vw + 10px);
  }
`;

const useStyles = makeStyles({
  closeRoot: {
    display: "inline-block",
    marginLeft: "auto"
  }
});

// onAddNewUser: callback for when a new user is added
function EditUserDialog({ close, data }) {
  const initialFormState = {
    name: data.name,
    preferredName: data.preferredName,
    email: data.email,
    role: data.role,
    programs: new Set(data.programs.map((p) => p.name))
  };

  const [formState, dispatchUpdateFormState] = useReducer(
    userFormStateReducer,
    initialFormState
  );
  const styles = useStyles();

  function updateUser() {
    const requestBody = {
      userId: data.userId,
      name: formState.name,
      preferredName: formState.preferredName,
      email: formState.email,
      role: formState.role,
      programs: Array.from(formState.programs).map((p) => ({
        name: p,
        access: "regular user"
      }))
    };
    UPDATE.updateUserAPI(requestBody)
      .then((response) => {
        console.log(response);
        close();
        window.location.reload();
      })
      .then((err) => console.log(err));
  }

  return (
    <Wrapper>
      <Header>
        <h4>Edit existing user</h4>
        <IconButton
          onClick={close}
          classes={{ root: styles.closeRoot }}
          size="small"
        >
          <Close />
        </IconButton>
      </Header>
      <EditUserForm formState={formState} dispatch={dispatchUpdateFormState} />
      <DeleteUser close={close} userId={data.userId} />
      <Button
        onClick={() => updateUser()}
        fullWidth
        variant="contained"
        color="primary"
      >
        Save changes
      </Button>
    </Wrapper>
  );
}

export default EditUserDialog;
