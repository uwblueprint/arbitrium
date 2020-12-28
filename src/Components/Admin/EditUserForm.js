import React, { useCallback } from "react";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import UserRoleSelect from "./UserRoleSelect";
import { EDIT_EMAIL, EDIT_ROLE } from "../../Reducers/UserFormStateReducer";

const StyledLabel = styled(InputLabel)`
  margin-bottom: 4px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 16px;
`;

// onAddNewUser: callback for when a new user is added
function EditUserForm({ dispatch, formState, newUser }) {
  const dispatchEmailChange = useCallback(
    (event) => {
      dispatch({ type: EDIT_EMAIL, email: event.target.value });
    },
    [dispatch]
  );

  const dispatchRoleChange = useCallback(
    (event) => {
      dispatch({ type: EDIT_ROLE, role: event.target.value });
    },
    [dispatch]
  );

  return (
    <div>
      {!newUser && (
        <QuestionWrapper>
          <StyledLabel htmlFor="name-Input">Name</StyledLabel>
          <OutlinedInput
            fullWidth
            id="name-input"
            value={formState.name}
            disabled
          />
        </QuestionWrapper>
      )}
      <QuestionWrapper>
        <StyledLabel htmlFor="email-input">Email</StyledLabel>
        <OutlinedInput
          fullWidth
          id="email-input"
          onChange={dispatchEmailChange}
          value={formState.email}
          disabled={!newUser}
        />
      </QuestionWrapper>
      <QuestionWrapper>
        <StyledLabel htmlFor="role-select">Admin</StyledLabel>
        <UserRoleSelect
          id="role-select"
          value={formState.role}
          onChange={dispatchRoleChange}
        />
      </QuestionWrapper>
    </div>
  );
}

export default EditUserForm;
