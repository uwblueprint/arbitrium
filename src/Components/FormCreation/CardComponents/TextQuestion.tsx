import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
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
  onValidation: (validation: Validation) => void;
  initialValidation: Validation;
  onChange: (text: string) => void;
  initialAnswer: string;
  onValidUpdate: (isValid: boolean) => void;
  isTextValid: (validation: Validation, text: string) => boolean;
};

//TODO: Add Response Validation
function TextQuestion({
  submission = false,
  short_answer,
  onValidation,
  initialValidation,
  onChange,
  initialAnswer = "",
  onValidUpdate,
  isTextValid
}: Props): React.ReactElement {
  const [text, setText] = useState(initialAnswer);

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //Check validations here and update the error prop accordingly
    if (initialValidation && initialValidation.active) {
      if (initialValidation.max !== 0) {
        if (
          (initialValidation.type === "CHAR" &&
            event.target.value.length > initialValidation.max) ||
          (initialValidation.type === "WORD" &&
            event.target.value.split(" ").length > initialValidation.max)
        ) {
          // violates MAX validation
          if (isValid) {
            onValidUpdate(false);
          }
          setIsValid(false);
          setErrorMessage(
            "Entered text exceeds the maximum " +
              initialValidation.type.toLowerCase() +
              " count of " +
              initialValidation.max +
              "."
          );
        } else {
          if (!isValid) {
            onValidUpdate(true);
          }
          setIsValid(true);
          setErrorMessage("");
        }
      } else {
        if (
          (initialValidation.type === "CHAR" &&
            event.target.value.length < initialValidation.min) ||
          (initialValidation.type === "WORD" &&
            event.target.value.split(" ").length < initialValidation.min)
        ) {
          // violates MIN validation
          if (isValid) {
            onValidUpdate(false);
          }
          setIsValid(false);
          setErrorMessage(
            "Entered text is below the minimum " +
              initialValidation.type.toLowerCase() +
              " count of " +
              initialValidation.min +
              "."
          );
        } else {
          if (!isValid) {
            onValidUpdate(true);
          }
          setIsValid(true);
          setErrorMessage("");
        }
      }
    }
    setText(event.target.value);
  };

  const [isValid, setIsValid] = useState(
    submission && initialValidation && isTextValid(initialValidation, initialAnswer)
  );

  const [errorMessage, setErrorMessage] = useState(
    !initialValidation || !initialValidation?.active
      ? ""
      : initialValidation?.max === 0
      ? "Entered text is below the minimum " +
        initialValidation?.type.toLowerCase() +
        " count of " +
        initialValidation?.min +
        "."
      : "Entered text exceeds the maximum " +
        initialValidation?.type.toLowerCase() +
        " count of " +
        initialValidation?.max +
        "."
  );

  const [validationType, setValidationType] = useState(
    initialValidation?.type
      ? (initialValidation?.type.toLowerCase() as string)
      : "word"
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
      min: validationLimit === "least" ? validationCount : 0,
      active: true
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
      min: valLimit === "least" ? validationCount : 0,
      active: true
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
        min: validationLimit === "least" ? parseInt(event.target.value) : 0,
        active: true
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
      {submission && !isValid ? (
        <p style={{ color: "red" }}>{errorMessage}</p>
      ) : null}
      {!submission &&
      initialValidation &&
      initialValidation.active &&
      !short_answer ? (
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
