import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { AnyNaptrRecord } from "dns";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { Validation } from "../../../Types/FormTypes";
import InputBase from "@material-ui/core/InputBase";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 744px;
  fontsize: 14px;
`;

type Props = {
  submission: boolean;
  short_answer: boolean;
  validation?: AnyNaptrRecord;
  onValidation: (validation: Validation) => void;
  initialValidation: Validation;
  onChange: (text: string) => void;
  initialAnswer: string;
};

//TODO: Add Response Validation
function TextQuestion({
  submission = false,
  short_answer,
  onChange,
  validation,
  onValidation,
  initialValidation,
  initialAnswer = ""
}: Props): React.ReactElement {
  const [text, setText] = useState(initialAnswer);
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Check validations here and update the error prop accordingly
    setText(event.target.value);
  };

  const [validationType, setValidationType] = useState(
    initialValidation?.type.toLowerCase() as string
  );
  const [validationLimit, setValidationLimit] = useState(
    (initialValidation?.min as number) !== 0 ? "least" : "most"
  );
  const [validationCount, setValidationCount] = useState(
    initialValidation?.max !== 0
      ? (initialValidation?.max as number)
      : (initialValidation?.min as number)
  );

  const updateValidationType = (valType: string) => {
    // todo
    setValidationType(valType);

    const validation = {
      type: valType.toUpperCase(),
      expression: null,
      max: validationLimit === "most" ? validationCount : 0,
      min: validationLimit === "least" ? validationCount : 0
    };
    onValidation(validation);
  };

  const updateValidationLimit = (valLimit: string) => {
    // todo
    setValidationLimit(valLimit);

    const validation = {
      type: validationType?.toUpperCase(),
      expression: null,
      max: valLimit === "most" ? validationCount : 0,
      min: valLimit === "least" ? validationCount : 0
    };
    onValidation(validation);
  };

  const updateValidationCount = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    if (event.target.value === "") {
      setValidationCount(0);
    } else {
      setValidationCount(parseInt(event.target.value));

      const validation = {
        type: validationType?.toUpperCase(),
        expression: null,
        max: validationLimit === "most" ? parseInt(event.target.value) : 0,
        min: validationLimit === "least" ? parseInt(event.target.value) : 0
      };
      onValidation(validation);
    }
  };

  return (
    <Wrapper>
      <InputBase
        disabled={!submission}
        error={false}
        placeholder={short_answer ? "Short answer text" : "Long answer text"}
        style={{ fontSize: "14px" }}
        value={text}
        onBlur={() => onChange(text)}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          handleTextChange(event)
        }
        multiline={!short_answer}
        fullWidth={true}
      ></InputBase>
      {validation && !short_answer ? (
        <div>
          <Select
            defaultValue={validationType || "word"}
            style={{ width: "150px", marginRight: "20px", marginTop: "20px" }}
          >
            <MenuItem value="word" onClick={() => updateValidationType("word")}>
              Word count
            </MenuItem>
            <MenuItem value="char" onClick={() => updateValidationType("char")}>
              Character count
            </MenuItem>
          </Select>
          <Select
            defaultValue={validationLimit || "least"}
            style={{ width: "100px", marginRight: "20px", marginTop: "20px" }}
          >
            <MenuItem
              value="most"
              onClick={() => updateValidationLimit("most")}
            >
              At most
            </MenuItem>
            <MenuItem
              value="least"
              onClick={() => updateValidationLimit("least")}
            >
              At least
            </MenuItem>
          </Select>
          <TextField
            value={validationCount || 0}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              updateValidationCount(event)
            }
            style={{ width: "50px", marginRight: "20px", marginTop: "20px" }}
          />
        </div>
      ) : null}
    </Wrapper>
  );
}

export default TextQuestion;
