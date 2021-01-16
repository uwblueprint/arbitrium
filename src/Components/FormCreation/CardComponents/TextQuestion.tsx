import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { AnyNaptrRecord } from "dns";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 744px;
`;

type Props = {
  submission: boolean;
  short_answer: boolean;
  validation?: AnyNaptrRecord;
  onChange: (text: string) => void;
};

//TODO: Add Response Validation
function TextQuestion({
  submission = false,
  short_answer,
  validation,
  onChange
}: Props): React.ReactElement {
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
      {validation && !short_answer ? (
        <div>
          <Select
            defaultValue="word"
            style={{ width: "150px", marginRight: "20px", marginTop: "20px" }}
          >
            <MenuItem value="word">Word count</MenuItem>
            <MenuItem value="char">Character count</MenuItem>
          </Select>
          <Select
            defaultValue="most"
            style={{ width: "100px", marginRight: "20px", marginTop: "20px" }}
          >
            <MenuItem value="most">At most</MenuItem>
            <MenuItem value="least">At least</MenuItem>
          </Select>
          <TextField
            value={500}
            style={{ width: "50px", marginRight: "20px", marginTop: "20px" }}
          />
        </div>
      ) : null}
    </Wrapper>
  );
}

export default TextQuestion;
