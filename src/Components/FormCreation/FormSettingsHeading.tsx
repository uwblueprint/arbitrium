import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const FormSettingsHeadingTitle = styled(Typography)`
  && {
    display: inline-block;
    text-transform: uppercase;
    font-family: Roboto;
    font-size: 10px;
    font-weight: 500;
    margin-top: 24px;
    margin-bottom: 16px;
    letter-spacing: 1.5px;
  }
`;

type Props = {
  iconRight?: React.ReactNode;
  children: React.ReactNode;
};

function FormSettingsHeading({
  iconRight,
  children
}: Props): React.ReactElement<"div"> {
  return (
    <div>
      <FormSettingsHeadingTitle>{children}</FormSettingsHeadingTitle>
      {iconRight && iconRight}
    </div>
  );
}

export default FormSettingsHeading;
