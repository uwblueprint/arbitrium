import React, { useReducer, useCallback } from "react";
import { HEADER_HEIGHT } from "../Header/Header";
import InputBase from "@material-ui/core/InputBase";
import customFormStateReducer, {
  EDIT_TITLE,
  EDIT_DESCRIPTION
} from "../../Reducers/CustomFormStateReducer";
import styled from "styled-components";
import FormCard from "./FormCard";
import FormSection from "./FormSection";

const Wrapper = styled.div`
  margin-top: ${HEADER_HEIGHT}px;
`;

const FormWrapper = styled.div`
  margin-top: 10%;
  padding-left: 10%;
  padding-right: 10%;
`;

const Header = styled.div`
  padding: 48px 100px;
  box-sizing: border-box;
  height: 176px;
  box-shadow: 0 2px 3px 1px #cccccc;
`;

const TitleInput = styled(InputBase)`
  input {
    font-size: 24px;
  }
  && {
    margin-bottom: 16px;
    line-height: 36px;
  }
`;

const DescriptionInput = styled(InputBase)`
  && {
    width: 646px
    display: block;
    line-height: 21px;
    overflow-y: auto;
    max-height: 48px;
  }
  textarea {
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

  const onTitleChange = useCallback(
    (e) => {
      dispatch({ type: EDIT_TITLE, title: e.target.value });
    },
    [dispatch]
  );

  const onDescriptionChange = useCallback(
    (e) => {
      dispatch({ type: EDIT_DESCRIPTION, description: e.target.value });
    },
    [dispatch]
  );

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
      <FormWrapper>
        <FormSection />
        <FormCard />
      </FormWrapper>
    </Wrapper>
  );
}

export default CreateEditForm;
