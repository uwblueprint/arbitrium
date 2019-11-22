import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  text-align: left;
`;

const CategoryWrapper = styled.div`
  display: grid;
  grid-template-columns: 390px 390px;
  grid-column-gap: 10px;
  font-size: 14px;
  margin: 10px 0;
  .category {
    display: grid;
    grid-template-columns: 100px 290px;
    margin: 10px 0;
  }
  .title {
    font-weight: 500;
  }
  .value {
    font-weight: normal;
  }
`;

const Categories = ({ categories }) => {
  return (
    <Wrapper>
      <h2>Administrative Categories</h2>
      <CategoryWrapper>
        {categories.map(({ title, value }) => (
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
