import React, { useReducer, useCallback } from "react";
import { HEADER_HEIGHT } from "../Header/Header";
import InputBase from "@material-ui/core/InputBase";
import customFormStateReducer, {
  EDIT_TITLE,
  EDIT_DESCRIPTION
} from "../../Reducers/CustomFormStateReducer";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: ${HEADER_HEIGHT}px;
  padding-left: 100px;
  padding-right: 100px;
`;

const Header = styled.div`
  padding-top: 48px;
  padding-bottom: 48px;
`;

const TitleInput = styled(InputBase)`
  input {
    font-size: 24px;
  }
`;

const DescriptionInput = styled(InputBase)`
  && {
    display: block;
  }
  textarea {
    width: 646px
    font-size: 14px;
    color: #888888;
  }
`;

const defaultForm = {
  title: "Untitled Form",
  description: ""
};

function CreateEditForm() {
  const [formState, dispatch] = useReducer(customFormStateReducer, defaultForm);

  const onTitleChange = useCallback((e) => {
    dispatch({ type: EDIT_TITLE, title: e.target.value });
  }, []);

  const onDescriptionChange = useCallback((e) => {
    dispatch({ type: EDIT_DESCRIPTION, description: e.target.value });
  }, []);

  return (
    <Wrapper>
      <Header>
        <TitleInput
          placeholder="Form Title"
          value={formState.title}
          onChange={onTitleChange}
        />
        <DescriptionInput
          multiline
          placeholder="Form description..."
          value={formState.description}
          onChange={onDescriptionChange}
        />
      </Header>
    </Wrapper>
  );
}

export default CreateEditForm;
