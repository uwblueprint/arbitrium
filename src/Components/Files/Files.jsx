import React from "react";
import styled from "styled-components";

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
    color: #005EB8;
    text-decoration: none;
    padding: 4px;
  }
  .size {
    color: #aaaaaa;
    margin-left: 4px;
    font-weight: normal;
  }
`;

const Files = ({ fileData }) => {
  return (
    <div>
      <h2>Files</h2>
      {fileData.map(({ name, size, link }, index) => (
        <FileButton key={index}>
          <span role="img" aria-label="fileIcon">
            📎
          </span>
          <span>
            <a className="name" target="_blank" href={link}>
              {" "}
              {name}
            </a>
          </span>
          {/*
            //The file sizes are currently hard coded
          <span className="size">{`(${size.toLocaleString()} K)`}</span>
          */
          }
        </FileButton>
      ))}
    </div>
  );
};

export default Files;
