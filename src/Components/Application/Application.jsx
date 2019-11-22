import React, { Component } from "react";
import styled from "styled-components";

import FlowSelector from "../FlowSelector/FlowSelector";
import Categories from "../Categories/Categories";

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

const MOCK_CATEGORY_DATA = [
  {
    title: "Category 1",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 2",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 3",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 4",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 5",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 6",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 7",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 8",
    value: "Lorem ipsum dolor sit amet consectetur."
  },
  {
    title: "Category 9",
    value: "Lorem ipsum dolor sit amet consectetur."
  }
];
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
          <Categories categories={MOCK_CATEGORY_DATA} />
          <hr />
          <hr />
          <hr />
        </Wrapper>
      </>
    );
  }
}
