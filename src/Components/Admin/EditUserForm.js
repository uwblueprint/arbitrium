import React, { useCallback } from "react";
import styled from "styled-components";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ProgramSelect from "./ProgramSelect";
import UserRoleSelect from "./UserRoleSelect";
import {
  EDIT_NAME,
  EDIT_PREFERRED_NAME,
  EDIT_EMAIL,
  EDIT_ROLE,
  EDIT_PROGRAMS
} from "../../Reducers/UserFormStateReducer";

const StyledLabel = styled(InputLabel)`
  margin-bottom: 4px;
`;

const QuestionWrapper = styled.div`
  margin-bottom: 16px;
`;

// onAddNewUser: callback for when a new user is added
function EditUserForm({ dispatch, formState }) {
  const dispatchNameChange = useCallback(
    (event) => {
      dispatch({ type: EDIT_NAME, name: event.target.value });
    },
    [dispatch]
  );

  const dispatchPreferredNameChange = useCallback(
    (event) => {
      dispatch({
        type: EDIT_PREFERRED_NAME,
        name: event.target.value
      });
    },
    [dispatch]
  );

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

  const dispatchProgramsChange = useCallback(
    (event) => {
      dispatch({
        type: EDIT_PROGRAMS,
        program: event.target.name
      });
    },
    [dispatch]
  );

  return (
    <div>
      <QuestionWrapper>
        <StyledLabel htmlFor="name-Input">Name</StyledLabel>
        <OutlinedInput
          fullWidth
          id="name-input"
          onChange={dispatchNameChange}
          value={formState.name}
        />
      </QuestionWrapper>
      <QuestionWrapper>
        <StyledLabel htmlFor="preferred-name-input">
          Preferred Name (optional)
        </StyledLabel>
        <OutlinedInput
          fullWidth
          id="preferred-name-input"
          onChange={dispatchPreferredNameChange}
          value={formState.preferredName}
        />
      </QuestionWrapper>
      <QuestionWrapper>
        <StyledLabel htmlFor="email-input">Email</StyledLabel>
        <OutlinedInput
          fullWidth
          id="email-input"
          onChange={dispatchEmailChange}
          value={formState.email}
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
      <QuestionWrapper>
        <StyledLabel htmlFor="role-select">
          Which program(s) are they a part of?
        </StyledLabel>
        <ProgramSelect
          onChange={dispatchProgramsChange}
          value={formState.programs}
        />
      </QuestionWrapper>
    </div>
  );
}

export default EditUserForm;
