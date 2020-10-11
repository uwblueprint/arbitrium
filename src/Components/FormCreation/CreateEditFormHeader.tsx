import React from "react";
import InputBase from "@material-ui/core/InputBase";
import styled from "styled-components";

const Header = styled.div`
  padding: 48px 100px;
  padding-left: 15%;
  box-sizing: border-box;
  height: 176px;
  box-shadow: 0 2px 3px 1px #cccccc;
`;

const TitleInput = styled(InputBase)`
  input {
    font-size: 24px;
  }
  && {
    width: 846px;
    margin-bottom: 16px;
    line-height: 36px;
  }
`;

const DescriptionInput = styled(InputBase)`
  && {
    width: 846px;
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

type HeaderData = {
  title: string;
  description: string;
};

type Props = {
  title: string;
  description: string;
  onChange: (data: HeaderData) => void;
};

function CreateEditFormHeader({
  title,
  description,
  onChange
}: Props): React.ReactElement<typeof Header> {
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      title: e.target.value,
      description
    });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      title,
      description: e.target.value
    });
  };

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
