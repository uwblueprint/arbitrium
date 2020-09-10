import React, { useCallback } from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";
import { useFormDispatch, useFormState } from "./CreateEditFormStateManagement";

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

function CreateEditFormHeader(): React.ReactElement<typeof Header> {
  const dispatch = useFormDispatch();
  const { title, description } = useFormState();

  const onTitleChange = useCallback(
    (e) => {
      dispatch({ type: "EDIT_TITLE", title: e.target.value });
    },
    [dispatch]
  );

  const onDescriptionChange = useCallback(
    (e) => {
      dispatch({ type: "EDIT_DESCRIPTION", description: e.target.value });
    },
    [dispatch]
  );

  return (
    <Header>
      <TitleInput
        placeholder="Form Title"
        value={title}
        onChange={onTitleChange}
      />
      <DescriptionInput
        multiline
        placeholder="Form description..."
        value={description}
        onChange={onDescriptionChange}
      />
    </Header>
  );
}

export default CreateEditFormHeader;
