import React, { useReducer } from "react";
import { HEADER_HEIGHT } from "../Header/Header";
import styled from "styled-components";

import CreateEditFormHeader from "./CreateEditFormHeader";
import {
  CreateEditFormDispatchContext,
  CreateEditFormStateContext,
  defaultFormState
} from "./CreateEditFormStateManagement";
import customFormStateReducer from "../../Reducers/CustomFormStateReducer";

const Wrapper = styled.div`
  margin-top: ${HEADER_HEIGHT}px;
`;

function CreateEditForm() {
  const [formState, dispatch] = useReducer(
    customFormStateReducer,
    defaultFormState
  );

  return (
    <Wrapper>
      <CreateEditFormStateContext.Provider value={formState}>
        <CreateEditFormDispatchContext.Provider value={dispatch}>
          <CreateEditFormHeader />
        </CreateEditFormDispatchContext.Provider>
      </CreateEditFormStateContext.Provider>
    </Wrapper>
  );
}

export default CreateEditForm;
