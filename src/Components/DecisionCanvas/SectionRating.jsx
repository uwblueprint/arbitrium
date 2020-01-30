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

function SectionRating({ onRatingChange, selectedRating, id, update, ...rest }) {

  const [rating, setRating] = useState(0);

  return (
    <SectionWrapper>
      <h3>Rating</h3>
      <span className="rating-info">
        Your rating for this question affects the overall suggested rating for
        this applicant. <Link>You can view the rubric here.</Link>
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
