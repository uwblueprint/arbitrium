import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 450px 450px;
  grid-column-gap: 10px;
  font-size: 14px;
  margin: 10px 0;
  .category {
    display: grid;
    grid-template-columns: 200px 250px;
    margin: 10px 0;
  }
  .title {
    font-weight: 500;
  }
  .value {
    font-weight: normal;
  }
`;

const Categories = ({ categoryData }) => {
  return (
    <Wrapper>
      <h2>Administrative Categories</h2>
      <CategoryWrapper>
        {categoryData.map(({ title, value }) => (
          <div className="category">
            <span className="title">{title}</span>
            <span className="value">{value}</span>
          </div>
        ))}
      </CategoryWrapper>
    </Wrapper>
  );
};

export default Categories;
