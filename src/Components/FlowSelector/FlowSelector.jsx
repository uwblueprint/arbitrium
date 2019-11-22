import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #cccccc;
  button {
    text-transform: uppercase;
    outline: 0;
    background: #ffffff;
    font-family: inherit;
    letter-spacing: 0.3px;
    font-weight: 700;
    border: 0px solid #6202ee;
    border-bottom-width: 4px;
    padding: 20px 16px;
    &:disabled {
      border-color: transparent;
    }
  }
`;

const FlowSelector = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default FlowSelector;
