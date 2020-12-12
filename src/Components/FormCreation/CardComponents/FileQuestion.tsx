import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Select from "@material-ui/core/Select";
import * as FILE from "../../../requests/file";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 816px;
`;

type Props = {
  submission: boolean;
  short_answer: boolean;
  validation?: any;
  onChange: (options: any) => void;
  active: boolean;
  initialNumFiles?: number;
};

//TODO: Add Response Validation
function FileQuestion({
  submission,
  active,
  validation,
  onChange,
  initialNumFiles
}: Props) {
  const [numFiles, setnumFiles] = useState(initialNumFiles || 1);
  const handleNumFileChange = (value: any) => {
    //Check validations here and update the error prop accordingly
    setnumFiles(value as number);
    onChange(numFiles);
  };

  const numFileOptions = [1, 2, 3, 5, 10];

  async function handleFile(event: any) {
    let file = event.target.files[0]; //access the file
    //todo: check if the file extension is valid (on submission)
    const formData = new FormData();
    formData.append("file", file); // appending file
    //result will be a link to the file, which we should save to our DB
    await FILE.fileUpload("arbitrium", file.name, formData);
  }

  return (
    <Wrapper>
      {active ? (
        <div style={{ display: "flex" }}>
          <p style={{ fontWeight: 500, marginRight: 185 }}>
            {" "}
            Maximum number of files{" "}
          </p>
          <Select
            value={numFiles}
            onChange={(event) => handleNumFileChange(event.target.value)}
          >
            {numFileOptions.map((opt) => {
              return <option value={opt}>{opt}</option>;
            })}
          </Select>
        </div>
      ) : (
        <div>
          <Button
            variant="outlined"
            component="label"
            color="primary"
            disabled={!submission}
          >
            <CloudUploadIcon />
            <div style={{ width: "15px" }}></div>
            Upload File
            <input
              type="file"
              onChange={(event) => handleFile(event)}
              style={{ display: "none" }}
            />
          </Button>{" "}
        </div>
      )}
    </Wrapper>
  );
}

export default FileQuestion;
