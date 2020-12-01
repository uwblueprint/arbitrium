import React from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 816px;
`;

function CreateEditParagraph({ submission = false }) {
  return (
    <Wrapper>
      <TextField
        disabled={!submission}
        placeholder="Long answer text"
        size="medium"
        multiline
        rowsMax={4}
        fullWidth="true"
      ></TextField>
    </Wrapper>
  );
}

export default CreateEditParagraph;
