import React from "react";
import styled from "styled-components";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const Wrapper = styled.div`
.checkbox {
    display: block;
`;

// TODO: fetch from mongo
const programOptions = [
  { name: "SVP Investee Grant", id: "SVP Investee Grant" },
  { name: "SVP Teens", id: "SVP Teens" },
  { name: "SVP Perfect Pitch", id: "SVP Perfect Pitch" }
];

function ProgramSelect({ value, onChange }) {
  return (
    <Wrapper>
      {programOptions.map((program) => (
        <FormControlLabel
          className="checkbox"
          key={program.id}
          control={
            <Checkbox
              color="primary"
              checked={value.has(program.id)}
              onChange={onChange}
              name={program.id}
            />
          }
          label={program.name}
        />
      ))}
    </Wrapper>
  );
}

export default ProgramSelect;
