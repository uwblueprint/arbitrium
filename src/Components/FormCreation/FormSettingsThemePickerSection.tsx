import React, { useState } from "react";
import styled from "styled-components";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FormSettingsHeading from "./FormSettingsHeading";
import Done from "@material-ui/icons/Done";

const defaultColoursHex = [
  "D9463D",
  "673FB4",
  "2261AD",
  "4688F0",
  "1DAAF1",
  "1DBCD2",
  "FD5830",
  "FD9827",
  "139588",
  "4FAE55",
  "617D8A",
  "9E9E9E",
  "FC0D1B"
];

const ColoursWrapper = styled.div`
  padding-right: 80px;
`;

const ColourButton = styled(IconButton)`
  && {
    width: 32px;
    height: 32px;
    padding: 4px;
    margin-right: 8px;
    margin-bottom: 8px;
  }
`;

type Props = {
  colour: string;
  onSelect: (colour: string) => void;
};

function FormSettingsThemePickerSection({
  colour,
  onSelect
}: Props): React.ReactElement<"div"> {
  return (
    <div>
      <FormSettingsHeading>Theme Colour</FormSettingsHeading>
      <ColoursWrapper>
        {defaultColoursHex.map((hex) => (
          <ColourButton
            onClick={() => onSelect(hex)}
            style={{ background: `#${hex}` }}
            key={hex}
            aria-label={hex}
          >
            {hex === colour && <Done style={{ fontSize: 18, color: "#fff" }} />}
          </ColourButton>
        ))}
      </ColoursWrapper>
      <Divider />
    </div>
  );
}

export default FormSettingsThemePickerSection;
