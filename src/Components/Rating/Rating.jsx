import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";

import RatingList from "../RatingList/RatingList";
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import SectionRating from "../DecisionCanvas/SectionRating";

const StyledPaper = styled(Paper)`
  font-size: 14px;
  box-shadow: 0 2px 4px 2px #cccccc;
  padding: 20px;
  border-radius: 1px;
  display: block;
  text-align: left;
  h3 {
    margin: 0 0 8px;
  }
  .rating-info {
    color: #888888;
    font-size: 14px;
    margin-top: 0;
  }
  .suggested {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const Rating = ({ update, review }) => {
  let averageRating = 0;
  let numRatings = 0;
  let comments = [];
  if (review) {
    review.questionList.map(item => {
      if (item.rating > 0) {
        averageRating += item.rating;
        numRatings += 1;
      }
    });
    comments = review.comments;
    if (numRatings > 0) {
      averageRating = averageRating / numRatings;
    }
  }
  return (
    <StyledPaper elevation={0}>
      <h3>Suggested Rating</h3>
      <p className="rating-info">
        The suggested rating is the average of your decision canvas ratings.
      </p>
      <p className="suggested">{averageRating.toFixed(2)}</p>
      <h3>Overall Rating</h3>
      <p className="rating-info">
        Your rating will be weighed with your peers.
      </p>
      <SectionRating
        id="master"
        update={update}
        review={review}
      ></SectionRating>
      <h3>Comment</h3>
      <p className="rating-info">
        Your comments will be visible only to the admin.
      </p>
      {comments.map((comment, i) => (
        <Comment comment={comment} key={i} />
      ))}
      <AddComment
        placeholder={"Add a comment..."}
        primaryLabel="Comment"
        secondaryLabel="Cancel"
        update={update}
        id="master"
      />
    </StyledPaper>
  );
};

export default Rating;
