import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 20px;
  button {
    border: 0;
    outline: 0;
    background: transparent;
    text-align: center;
    font-family: inherit;
    padding: 0;
  }
  margin-top: 8px;
  .emojiRating {
    padding: 3px;
    margin-right: 8px;
    font-size: 16px;
    background: #cccccc;
  }
  .numberRating {
    margin-top: 4px;
    margin-right: 8px;
  }
`;

const RatingList = () => (
  <Wrapper>
    <button>
      <div className="emojiRating"><span role="img" aria-label="1">🙁</span></div>
      <div className="numberRating">1</div>
    </button>
    <button>
      <div className="emojiRating"><span role="img" aria-label="2">😐</span></div>
      <div className="numberRating">2</div>
    </button>
    <button>
      <div className="emojiRating"><span role="img" aria-label="3">🙂</span></div>
      <div className="numberRating">3</div>
    </button>
    <button>
      <div className="emojiRating"><span role="img" aria-label="4">😃</span></div>
      <div className="numberRating">4</div>
    </button>
    <button>
      <div className="emojiRating"><span role="img" aria-label="5">😍</span></div>
      <div className="numberRating">5</div>
    </button>
  </Wrapper>
);

export default RatingList;
 
