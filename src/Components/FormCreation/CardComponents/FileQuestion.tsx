import React, { useState } from "react";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Select from "@material-ui/core/Select";
import { fileUpload, downloadFile, deleteFile } from "../../../requests/file";
import usePromise from "../../../Hooks/usePromise";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import CloudDoneIcon from "@material-ui/icons/CloudDone";
import CloseIcon from "@material-ui/icons/Close";

const Wrapper = styled.div`
  margin-top: 16px;
  margin-bottom: 33px;
  width: 816px;
`;

type Props = {
  submission: boolean;
  short_answer: boolean;
  validation?: any;
  onChange: (options: Array<string> | number) => void;
  active: boolean;
  initialNumFiles?: number;
  fileUploadURL?: string;
  initialAnswer: Array<string>;
};

const useStyles = makeStyles({
  button: {
    height: 36,
    marginTop: 16,
    marginBottom: 24,
    marginLeft: 16
  },
  title: {
    marginLeft: 16
  }
});

function getFileName(awsFilePath: string | null | undefined) {
  if (!awsFilePath) {
    return null;
  }
  const split = awsFilePath.split("/");
  return split[split.length - 1];
}

//TODO: Add Response Validation
function FileQuestion({
  submission,
  active,
  onChange,
  fileUploadURL,
  initialNumFiles = 1,
  initialAnswer = []
}: Props): React.ReactElement {
  const [numFiles, setnumFiles] = useState(initialNumFiles || 1);
  const classes = useStyles();
  const [spinner, setSpinner] = useState(false);
  const handleNumFileChange = (value: number | null | unknown) => {
    //Check validations here and update the error prop accordingly
    setnumFiles(value as number);
    onChange(value as number);
  };
  const [files, setFiles] = useState(initialAnswer as Array<string>);

  const numFileOptions = [1, 2, 3, 5, 10];

  async function handleFileUpload(filesToUpload: FileList | null) {
    if (!filesToUpload) return;
    setSpinner(true);
    const file = filesToUpload[0]; //access the file

    if (files.length >= initialNumFiles) {
      alert("You may only upload a maxiumum of: " + initialNumFiles);
      setSpinner(false);
      return;
    }

    if (file) {
      //todo: check if the file extension is valid
      const formData = new FormData();
      formData.append("file", file); // appending file

      //returns the url to the file in aws
      const result = await fileUpload(
        "arbitrium",
        fileUploadURL + file.name,
        formData
      );
      setFiles([...files, result]);
      onChange([...files, result]);
    }
    setSpinner(false);
  }

  async function handleRemoveFile(index: number) {
    const updatedFiles = files.filter((file, i) => i !== index);
    //We delete files to make sure we don't waste space
    await deleteFile(
      "arbitrium",
      fileUploadURL + (getFileName(files[index]) || "")
    );
    setFiles(updatedFiles);
    onChange(updatedFiles);
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

  // let link = "";
  // //Create a link to download the file :)
  // if (!loadFile.isPending && loadFile.value && loadFile.value.Body) {
  //   const bytes = new Uint8Array(loadFile.value.Body.data); // pass your byte response to this constructor
  //   const blob = new Blob([bytes], { type: "application/octet-stream" }); // change resultByte to bytes
  //   link = window.URL.createObjectURL(blob);

  //   // const headerImg = document?.querySelector<HTMLImageElement>("#image");
  //   // // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  //   // headerImg!.src = link;
  // }

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
          <p className={classes.title}>
            {"Maximum of " + initialNumFiles + " files"}
          </p>
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
              onChange={(event) => handleFileUpload(event.target.files)}
              onClick={(event) => {
                event.currentTarget.value = "";
              }}
              style={{ display: "none" }}
            />
          </Button>
          <hr></hr>
          {files.map((file, index) => (
            <div style={{ display: "flex", alignItems: "center" }} key={index}>
              {getFileName(file)}{" "}
              {spinner ? <CircularProgress size={20} /> : null}
              <CloudDoneIcon style={{ paddingLeft: "50px" }} />
              <Button key={index} onClick={() => handleRemoveFile(index)}>
                <CloseIcon fontSize="small" />
              </Button>
              {}
            </div>
          ))}
        </div>
      ) : null}
    </Wrapper>
  );
}

export default FileQuestion;
