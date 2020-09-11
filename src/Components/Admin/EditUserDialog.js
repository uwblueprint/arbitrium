import React, { useReducer, useState } from "react";
import styled from "styled-components";
import ErrorIcon from "@material-ui/icons/Error";
import Button from "@material-ui/core/Button";
import Dialog from "../Common/Dialogs/Dialog";
import DialogHeader from "../Common/Dialogs/DialogHeader";
import Snackbar from "@material-ui/core/Snackbar";
import LoadingOverlay from "../Common/LoadingOverlay";
import { userFormStateReducer } from "../../Reducers/UserFormStateReducer";
import EditUserForm from "./EditUserForm";
import DeleteUser from "./DeleteUser";
import * as UPDATE from "../../requests/update";

const SaveFailure = styled.div`
  p {
    display: inline-block;
    color: #ffffff;
    margin-left: 12px;
    margin-right: 12px;
  }
  background-color: #333333;
  border-radius: 4px;
  position: relative;
  display: flex;
  align-items: center;
`;

const SaveWrapper = styled.div`
  position: relative;
`;

// onAddNewUser: callback for when a new user is added
function EditUserDialog({ close, data }) {
  const programs = [];
  data.programs.forEach((p) => {
    if (p.id !== undefined) {
      programs.push(p.id);
    } else {
      //Migrate
      if (p.name === "SVP Investee Grant") {
        programs.push("5f54b0779971a3dd4f7421f1");
        programs.push("5f54b07f9971a3dd4f742328");
      }
      if (p.name === "Emergency Fund") {
        //null
      }
      if (p.name === "UnitedWay") {
        programs.push("5f54b04d9971a3dd4f741a9e");
        programs.push("5f54af1b9971a3dd4f73e451");
      }
    }
  });

  const initialFormState = {
    name: data.name,
    preferredName: data.preferredName,
    email: data.email,
    role: data.admin ? "Admin" : "Reviewer",
    programs: new Set(programs)
  };

  console.log(initialFormState);

  const [formState, dispatchUpdateFormState] = useReducer(
    userFormStateReducer,
    initialFormState
  );

  const [showSaveFailure, setShowSaveFailure] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateUser() {
    setIsSubmitting(true);
    const requestBody = {
      userId: data.userId,
      name: formState.name,
      preferredName: formState.preferredName,
      email: formState.email,
      admin: formState.role === "Admin",
      organization: [],
      programs: Array.from(formState.programs).map((program) => ({
        id: program,
        role: "reviewer"
      }))
    };
    UPDATE.updateUserAPI(requestBody)
      .then((response) => {
        console.log(response);
        close();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setIsSubmitting(false);
        setShowSaveFailure(true);
      });
  }

  const handleSnackbarClose = () => {
    setShowSaveFailure(false);
  };

  return (
    <Dialog
      width={400}
      maxHeight="70%"
      paddingHorizontal={28}
      paddingVertical={28}
    >
      <DialogHeader onClose={close} title="Edit existing user" />
      <LoadingOverlay
        show={isSubmitting}
        spinnerProps={{
          radius: 120,
          stroke: 2
        }}
      />
      <EditUserForm formState={formState} dispatch={dispatchUpdateFormState} />
      <DeleteUser
        close={close}
        userId={data.userId}
        setShowSaveFailure={setShowSaveFailure}
        setIsSubmitting={setIsSubmitting}
      />
      <SaveWrapper>
        <Button
          onClick={() => updateUser()}
          fullWidth
          variant="contained"
          color="primary"
        >
          Save changes
        </Button>
        <Snackbar
          open={showSaveFailure}
          autoHideDuration={2000}
          onClose={handleSnackbarClose}
          style={{
            position: "absolute",
            bottom: 0,
            minWidth: "max-content"
          }}
        >
          <SaveFailure>
            <ErrorIcon style={{ fill: "#FFFFFF", marginLeft: "12px" }} />
            <p>Failed to save changes, please try again!</p>
          </SaveFailure>
        </Snackbar>
      </SaveWrapper>
    </Dialog>
  );
}

export default EditUserDialog;
