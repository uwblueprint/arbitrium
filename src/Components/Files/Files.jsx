import React from "react";
import styled from "styled-components";

const FileButton = styled.button`
  outline: 0;
  border: 0;
  font-family: inherit;
  font-weight: 500;
  background: none;
  font-size: 14px;
  display: block;
  margin: 8px 0;
  .name {
    color: #6202ee;
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
      {fileData.map(({ name, size }) => (
        <FileButton>
          📎
          <span className="name">{name}</span>
          <span className="size">{`(${size.toLocaleString()} K)`}</span>
        </FileButton>
      ))}
    </div>
  );
};

export default Files;
