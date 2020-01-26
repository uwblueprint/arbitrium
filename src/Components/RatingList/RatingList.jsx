import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 20px;
  button {
    border: 0;
    font-family: inherit;
    background: transparent;
    margin-right: 8px;
    outline: 0;
    padding: 0;
    text-align: center;
    :hover {
      cursor: pointer;
    }
  }
  margin-top: 8px;
  .emojiRating {
    background: #cccccc;
    font-size: 24px;
    line-height: 24px;
    padding: 3px;
  }
  .numberRating {
    margin-top: 4px;
    margin-left; auto;
    margin-right; auto;
  }
`;

const ratings = [
  {
    icon: "😕",
    value: 1
  },
  {
    icon: "😐",
    value: 2
  },
  {
    icon: "🙂",
    value: 3
  },
  {
    icon: "😄",
    value: 4
  },
  {
    icon: "😍",
    value: 5
  }
];

const RatingList = ({ onRatingChange, selectedRating }) => (
  <Wrapper>
    {ratings.map(rate => (
      <button
        onClick={() => onRatingChange && onRatingChange(rate.value)}
        style={selectedRating === rate.value ? { border: "solid 1px" } : null}
      >
        <div className="emojiRating">
          <span role="img" aria-label={`${rate.value}`}>
            {rate.icon}
          </span>
        </div>
        <div className="numberRating">{rate.value}</div>
      </button>
    ))}
  </Wrapper>
);

export default RatingList;
