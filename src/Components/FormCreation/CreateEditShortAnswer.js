import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 816px;
`;

function CreateEditShortAnswer() {
  // Text is a string
  const [text, setText] = useState("");

  return (
    <Wrapper>
      <TextField
        disabled
        placeholder="Short answer text"
        size="medium"
        multiline="true"
        fullWidth="true"
        inputProps={{ maxLength: 250 }}
      ></TextField>
    </Wrapper>
  );
}

export default CreateEditShortAnswer;
