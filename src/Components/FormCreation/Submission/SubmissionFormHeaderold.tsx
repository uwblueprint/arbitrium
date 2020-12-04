import React from "react";
import styled from "styled-components";

const Header = styled.div`
  padding: 48px 100px;
  padding-left: 15%;
  box-sizing: border-box;
  height: 176px;
  box-shadow: 0 2px 3px 1px #cccccc;
`;

const NameField = styled.div`
  font-size: 24px;
  width: 846px;
  margin-bottom: 16px;
  line-height: 36px;
`;

const DescriptionField = styled.div`
  width: 846px;
  display: block;
  line-height: 21px;
  overflow-y: auto;
  max-height: 48px;
  font-size: 14px;
  color: #888888;
`;

type Props = {
  name: string;
  description: string;
};

function SubmissionFormHeaderold({
  name,
  description
}: Props): React.ReactElement<typeof Header> {
  return (
    <div>
      <NameField>{name}</NameField>
      <DescriptionField>{description}</DescriptionField>
    </div>
  );
}

export default SubmissionFormHeaderold;
