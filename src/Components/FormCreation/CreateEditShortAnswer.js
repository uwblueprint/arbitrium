import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 816px;
`;

function CreateEditShortAnswer() {
  return (
    <Wrapper>
      <TextField
        disabled
        placeholder="Short answer text"
        size="medium"
        multiline
        rowsMax={2}
        fullWidth={true}
      ></TextField>
    </Wrapper>
  );
}

export default CreateEditShortAnswer;
