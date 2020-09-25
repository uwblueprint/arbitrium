import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import InputLabel from "@material-ui/core/InputLabel";
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

function DeleteUser({ close, userId, setShowSaveFailure, setIsSubmitting }) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  function deleteUser(userId) {
    setIsSubmitting(true);
    DELETE.deleteUserAPI(userId)
      .then(() => {
        close();
        window.location.reload();
      })
      .catch(() => {
        setIsSubmitting(false);
        setShowDeleteConfirmation(false);
        setShowSaveFailure(true);
      });
  }

  const handleDeleteClickAway = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <QuestionWrapper>
      <hr />
      <StyledLabel>Delete user?</StyledLabel>
      <WarningMessage>
        <p>
          Careful, you will delete the user and all associated data forever.
        </p>
      </WarningMessage>
      <ClickAwayListener onClickAway={handleDeleteClickAway}>
        <Button
          onClick={() => {
            if (showDeleteConfirmation) {
              deleteUser(userId);
            } else {
              setShowDeleteConfirmation(true);
            }
          }}
          variant="contained"
          style={{
            backgroundColor: "#C94031",
            color: "#FFFFFF"
          }}
        >
          {showDeleteConfirmation ? "Please confirm deletion" : "Delete user"}
        </Button>
      </ClickAwayListener>
      <hr />
    </QuestionWrapper>
  );
}

export default DeleteUser;
