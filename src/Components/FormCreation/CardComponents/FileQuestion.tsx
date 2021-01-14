import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Select from "@material-ui/core/Select";
import { fileUpload, downloadFile } from "../../../requests/file";
import usePromise from "../../../Hooks/usePromise";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, withStyles } from "@material-ui/core/styles";

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

const useStyles = makeStyles({
  button: {
    height: 36,
    marginTop: 16,
    marginBottom: 24,
    marginLeft: 16
  }
});

//TODO: Add Response Validation
function FileQuestion({
  submission,
  active,
  validation,
  onChange,
  initialNumFiles
}: Props) {
  const [numFiles, setnumFiles] = useState(initialNumFiles || 1);
  const classes = useStyles();
  const [spinner, setSpinner] = useState(false);
  const handleNumFileChange = (value: any) => {
    //Check validations here and update the error prop accordingly
    setnumFiles(value as number);
    onChange(value);
  };
  const [files, setFiles] = useState([]);

  const numFileOptions = [1, 2, 3, 5, 10];

  async function handleFileUpload(event: any) {
    setSpinner(true);
    const file = event.target.files[0]; //access the file

    //todo: check if the file extension is valid
    const formData = new FormData();
    formData.append("file", file); // appending file

    //returns the url to the file in aws
    const result = await fileUpload("arbitrium", file.name, formData);
    setFiles([...files, result]);
    setSpinner(false);
    onChange([...files, result]);
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
  if (!loadFile.isPending && loadFile.value && loadFile.value.Body) {
    const bytes = new Uint8Array(loadFile.value.Body.data); // pass your byte response to this constructor
    const blob = new Blob([bytes], { type: "application/octet-stream" }); // change resultByte to bytes
    link = window.URL.createObjectURL(blob);

    // const headerImg = document?.querySelector<HTMLImageElement>("#image");
    // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    // headerImg!.src = link;
  }

  const getFileName = (awsFilePath: string | null | undefined) => {
    if (!awsFilePath) {
      return null;
    }
    const split = awsFilePath.split("/");
    return split[split.length - 1];
  };

  return (
    <Wrapper>
      {!submission ? (
        active ? (
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
                type="file" //Display only
                style={{ display: "none" }}
              />
            </Button>{" "}
          </div>
        )
      ) : !loadFile.isPending ? (
        <div>
          <Button
            className={classes.button}
            variant="outlined"
            component="label"
            color="primary"
            startIcon={<CloudUploadIcon />}
          >
            {spinner ? <CircularProgress size={20} /> : "Upload File"}
            <input
              type="file"
              onChange={(event) => handleFileUpload(event)}
              style={{ display: "none" }}
            />
          </Button>
          <hr></hr>
          {files.map((file, index) => (
            <div key={index}>
              {getFileName(file)}{" "}
              {spinner ? <CircularProgress size={20} /> : null}
            </div>
          ))}
        </div>
      ) : null}
    </Wrapper>
  );
}

export default FileQuestion;
