import React from "react";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import DialogButton from "../Common/DialogButton";
import DeleteUserConfirmation from "./DeleteUserConfirmation";
import * as DELETE from "../../requests/delete";

const StyledLabel = styled(InputLabel)`
  margin-bottom: 8px;
`;

const WarningMessage = styled.div`
  p {
    font-size: 12px;
  }
  margin-bottom: 16px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 16px;
  hr {
    margin-top: 24px;
    margin-bottom: 20px;
  }
  p {
    font-size: 12px;
  }
`;

function DeleteUser({ close, userId, setShowSaveFailure }) {
  function deleteUser(userId) {
    DELETE.deleteUserAPI(userId)
      .then(() => {
        close();
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setShowSaveFailure(true);
      });
  }

  return (
    <QuestionWrapper>
      <hr />
      <StyledLabel>Delete user?</StyledLabel>
      <WarningMessage>
        <p>
          Careful, you will delete the user and all associated data forever.
        </p>
      </WarningMessage>
      <DialogButton
        Dialog={DeleteUserConfirmation}
        closeOnEsc={true}
        variant="contained"
        customBgColor="#C94031"
        alertParent={() => {
          deleteUser(userId);
        }}
      >
        Delete user
      </DialogButton>
      <hr />
    </QuestionWrapper>
  );
}

export default DeleteUser;
