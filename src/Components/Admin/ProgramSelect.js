import React from "react";
import styled from "styled-components";
import Spinner from "react-spinner-material";
import usePromise from "../../Hooks/usePromise";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import * as GET from "../../requests/get";

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

  const [programs] = usePromise(GET.getAllProgramsAPI, {}, [])
  console.log(programs)
  return (
    <Wrapper>
      {!programs.isPending ? (
        <>
          {programs.value.map((program) => (
            <FormControlLabel
              className="checkbox"
              key={program._id}
              control={
                <Checkbox
                  color="primary"
                  checked={value.has(program._id)}
                  onChange={onChange}
                  name={program._id}
                />
              }
              label={program.displayName}
            />
          ))}
        </>
      ) : (
        <>
          <h4>Loading Programs...</h4>
          <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
        </>
      )}
    </Wrapper>
  );
}

export default ProgramSelect;
