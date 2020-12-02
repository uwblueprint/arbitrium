import React, { useState, useEffect } from "react";
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
  onChange: (name: string, description: string) => void;
};

function CreateEditFormHeader({
  name,
  description,
  onChange
}: Props): React.ReactElement<typeof Header> {
  const [formTitle, setFormTitle] = useState(name);
  const [formDescription, setFormDescription] = useState(description);

  useEffect(() => {
    setFormTitle(name);
    setFormDescription(description);
  }, [name, description]);

  const updateHeader = () => {
    onChange(formTitle, formDescription);
  };

  return (
    <Header>
      <NameInput
        placeholder="Form name"
        value={formTitle}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormTitle(e.target.value)
        }
        onBlur={() => {
          updateHeader();
        }}
      />
      <DescriptionInput
        multiline
        placeholder="Form description..."
        value={formDescription}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setFormDescription(e.target.value)
        }
        onBlur={() => {
          updateHeader();
        }}
      />
    </Header>
  );
}

export default CreateEditFormHeader;
