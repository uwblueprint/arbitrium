import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 744px;
`;

type Props = {
  submission: boolean;
  short_answer: boolean;
  validation?: any;
  onChange: (text: string) => void;
};

//TODO: Add Response Validation
function TextQuestion({
  submission = false,
  short_answer,
  validation,
  onChange
}: Props) {
  const [text, setText] = useState("");
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Check validations here and update the error prop accordingly
    setText(event.target.value);
  };

  return (
    <Wrapper>
      <TextField
        disabled={!submission}
        error={false}
        placeholder={short_answer ? "Short answer text" : "Long answer text"}
        size="medium"
        value={text}
        onBlur={() => onChange(text)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleTextChange(event)
        }
        multiline
        rowsMax={short_answer ? 2 : 4}
        fullWidth={true}
      ></TextField>
    </Wrapper>
  );
}

export default TextQuestion;
