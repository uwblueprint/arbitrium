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
  button {
    text-transform: none;
  }
`;

function DeleteUser({
  close,
  userId,
  setShowSaveFailure,
  setIsSubmitting,
  programId
}) {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  function deleteUser(userId) {
    setIsSubmitting(true);
    DELETE.deleteUserProgramAPI(programId, userId)
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
      <StyledLabel>Remove user from this program?</StyledLabel>
      <WarningMessage>
        <p>
          If they have conducted any reviews, they will continue to show in
          reports and the Committee Review page.
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
          {showDeleteConfirmation ? "Please confirm removal" : "Remove access"}
        </Button>
      </ClickAwayListener>
      <hr />
    </QuestionWrapper>
  );
}

export default DeleteUser;
