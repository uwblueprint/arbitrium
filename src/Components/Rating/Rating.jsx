import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

import RatingList from "../RatingList/RatingList";
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";

const StyledPaper = styled(Paper)`
  box-shadow: 1px 1px 3px #cccccc;
  border-radius: 1px;
  padding: 20px;
  display: block;
  h3 {
    margin: 0 0 8px;
  }
  .rating-info {
    color: #cccccc;
    font-size: 14px;
    margin-top: 0;
  }
  .suggested {
    margin-bottom: 20px;
  }
`;

const Rating = ({ ratingData: { suggested, comments } }) => {
  return (
    <>
      <h2>Rating</h2>
      <StyledPaper>
        <h3>Suggested Rating</h3>
        <p className="rating-info">
          The suggested rating is the average of your decision canvas ratings.
        </p>
        <p className="suggested">{suggested.toFixed(2)}</p>
        <h3>Overall Rating</h3>
        <p className="rating-info">
          Your rating will be weighed with your peers.
        </p>
        <RatingList />
        <h3>Comment</h3>
        <p className="rating-info">
          Your comments will be visible only to the admin.
        </p>
        {comments.map(comment => (
          <Comment comment={comment} />
        ))}
        <AddComment />
      </StyledPaper>
    </>
  );
};

export default Rating;
