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

const NameInput = styled(InputBase)`
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
  name: string;
  description: string;
};

type Props = {
  name: string;
  description: string;
  onChange: (data: HeaderData) => void;
};

function SubmissionFormHeader({
  name,
  description,
  onChange
}: Props): React.ReactElement<typeof Header> {
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      name: e.target.value,
      description
    });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      name,
      description: e.target.value
    });
  };

  return (
    <Header>
      <NameInput placeholder="Form name" value={name} onChange={onNameChange} />
      <DescriptionInput
        multiline
        placeholder="Form description..."
        value={description}
        onChange={onDescriptionChange}
      />
    </Header>
  );
}

export default SubmissionFormHeader;
