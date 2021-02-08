import React from "react";
import styled from "styled-components";
import { downloadFile } from "../../requests/file";
import usePromise from "../../Hooks/usePromise";
import CircularProgress from "@material-ui/core/CircularProgress";

const FileButton = styled.button`
  outline: 0;
  border: 0;
  font-family: inherit;
  font-weight: 500;
  text-align: left;
  background: none;
  font-size: 14px;
  display: block;
  margin: 8px 0;
  .name {
    color: #005eb8;
    text-decoration: none;
    padding: 4px;
  }
  .size {
    color: #aaaaaa;
    margin-left: 4px;
    font-weight: normal;
  }
`;

function getFileName(awsFilePath) {
  if (!awsFilePath) {
    return null;
  }
  const split = awsFilePath.split("/");
  return split[split.length - 1];
}

const FileLink = ({ awsFileUrl, fileDownloadURL }) => {
  console.log({ awsFileUrl });

  //download a file from AWS
  const [loadFile] = usePromise(
    downloadFile,
    {
      bucketname: "arbitrium",
      filename: fileDownloadURL + getFileName(awsFileUrl || "")
    },
    null,
    []
  );

  console.log(loadFile);

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

  let fileName = getFileName(awsFileUrl || "");

  return (
    <div>
      <FileButton>
        <span role="img" aria-label="fileIcon">
          📎
        </span>
        <span>
          <a
            key={fileName}
            className="name"
            target="_blank"
            rel="noopener noreferrer"
            download={fileName}
            href={link}
          >
            {" "}
            {fileName}
          </a>
        </span>
        {/*
            //The file sizes are currently hard coded
          <span className="size">{`(${size.toLocaleString()} K)`}</span>
          */}
      </FileButton>
    </div>
  );
};

export default FileLink;
