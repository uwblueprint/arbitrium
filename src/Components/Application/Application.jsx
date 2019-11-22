import React, { Component } from "react";
import styled from "styled-components";
import FlowSelector from "../FlowSelector/FlowSelector";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  border: 2px solid red;
`;
export default class Application extends Component {
  render() {
    return (
      <>
        <FlowSelector>
          <button>1. Letter of Interest</button>
          <button disabled>2. Full Application</button>
        </FlowSelector>
        <Wrapper></Wrapper>
      </>
    );
  }
}
