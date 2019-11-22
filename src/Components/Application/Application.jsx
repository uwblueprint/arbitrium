import React, { Component } from "react";
import styled from "styled-components";

import FlowSelector from "../FlowSelector/FlowSelector";
import Categories from "../Categories/Categories";
import Files from "../Files/Files";

import { MOCK_CATEGORY_DATA, MOCK_FILE_DATA } from "./mockData.json";

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: 800px;
  h1 {
    font-size: 24px;
    font-weight: normal;
  }
  h2 {
    font-size: 20px;
    font-weight: 500;
  }
  hr {
    border: 0px solid #cccccc;
    border-bottom-width: 1px;
    margin: 20px 0;
  }
`;

export default class Application extends Component {
  render() {
    return (
      <>
        <FlowSelector>
          <button>1. Letter of Interest</button>
          <button disabled>2. Full Application</button>
        </FlowSelector>
        <Wrapper>
          <h1>UW Blueprint</h1>
          <hr />
          <Categories categoryData={MOCK_CATEGORY_DATA} />
          <hr />
          <Files fileData={MOCK_FILE_DATA} />
          <hr />
          <hr />
        </Wrapper>
      </>
    );
  }
}
