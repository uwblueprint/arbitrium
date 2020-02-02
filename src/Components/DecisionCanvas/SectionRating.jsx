import React, { useState } from "react";
import styled from "styled-components";

import Link from "@material-ui/core/Link";
import RatingList from "../RatingList/RatingList";

const SectionWrapper = styled.div`
  font-size: inherit;
  h3 {
    font-size: inherit;
    line-height: 20px;
    margin: 0;
  }
  .rating-info {
    color: #888888;
  }
`;

function SectionRating({ onRatingChange, selectedRating, id, update, review, ...rest }) {

  const [rating, setRating] = useState(0);


  if (review){
    if (id == "master" && (rating == 0 || rating != review.rating)){
      setRating(review.rating);
    }
    else {
      review.questionList.map((item) => {
        if (item.id === id && (rating == 0 || rating != item.rating)){
          setRating(item.rating);
        }
      })
    }
  }
  else if (rating != 0) {
    setRating(0);
  }
  return (
    <SectionWrapper>
      <h3>Rating</h3>
      <span className="rating-info">
        Your rating for this question affects the overall suggested rating for
        this applicant. Please refer to the rubric provided by SVP to help you
        decide on a final rating
      </span>
      <RatingList
        onRatingChange={rate => {
          setRating(rate)
          update("rating", {id, rate})
        }}
        selectedRating={rating}
      />
    </SectionWrapper>
  );
}

export default SectionRating;
