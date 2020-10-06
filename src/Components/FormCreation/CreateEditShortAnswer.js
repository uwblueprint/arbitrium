import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 816px;
`;

// const TextInput = styled(TextField)`
//   // && {
//   //   width: 716px;
//   //   display: inline-block;
//   //   line-height: 21px;
//   //   overflow-y: auto;
//   //   max-height: 48px;
//   //   position: absolute;
//   //   bottom: 0px;
//   //   left: 56px;
//   // }
//   // textarea {
//   //   font-size: 14px;
//   //   color: #888888;
//   // }
// `;

function CreateEditShortAnswer() {

  // Text is a string
  const [text, setText] = useState("");

  const handleSubmit = e => {
    e.preventdefault();
    if (!text) return;
    // Call function here to update backend form with new question
  }

  return (
    <Wrapper>
      <TextField placeholder="New text" size="medium" onChange="{e => setText(e.target.value)}" multiline="true" fullWidth="true">
        {/* <form onSubmit={handleSubmit}>
          <input type="text" maxLength="5" value={text} onChange={e => setText(e.target.value)}></input>
        </form> */}
      </TextField>
    </Wrapper>
  );
}

export default CreateEditShortAnswer;
