import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Select from "@material-ui/core/Select";
import { fileUpload, downloadFile } from "../../../requests/file";
import usePromise from "../../../Hooks/usePromise";

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
    const file = event.target.files[0]; //access the file
    //todo: check if the file extension is valid
    const formData = new FormData();
    formData.append("file", file); // appending file

    //returns the url to the file in aws
    await fileUpload("arbitrium", file.name, formData);
    //TODO Save to DB
  }

  //download a file from AWS
  //TODO: use for displaying download links on decision canvas
  const [loadFile] = usePromise(
    downloadFile,
    {
      bucketname: "arbitrium",
      filename: "about.png"
    },
    null,
    []
  );
  let link = "";
  //Create a link to download the file :)
  if (!loadFile.isPending) {
    const bytes = new Uint8Array(loadFile.value.Body.data); // pass your byte response to this constructor
    const blob = new Blob([bytes], { type: "application/octet-stream" }); // change resultByte to bytes
    link = window.URL.createObjectURL(blob);

    // const headerImg = document?.querySelector<HTMLImageElement>("#image");
    // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // headerImg!.src = link;
  }

  return (
    <Wrapper>
      {!loadFile.isPending ? (
        <div>
          <Button
            href={link}
            download="programs/5fab02657cf3c7788fc00d1fabout.png"
          >
            Download
          </Button>
        </div>
      ) : null}
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
            {numFileOptions.map((opt, index) => {
              return (
                <option key={index} value={opt}>
                  {opt}
                </option>
              );
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
