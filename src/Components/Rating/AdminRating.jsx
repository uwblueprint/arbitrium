import React from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";
import SectionRating from "../DecisionCanvas/SectionRating";
import { makeStyles } from "@material-ui/core/styles";

const StyledPaper = styled(Paper)`
  font-size: 14px;
  box-shadow: 0 2px 4px 2px #cccccc;
  padding: 0px;
  border-radius: 1px;
  display: block;
  text-align: left;
  h3 {
    margin: 0 0 8px;
    color: #000;
    font-size: 20px;
    font-weight: 500;
  }
  .overallRatingNumber {
    font-size: 18px;
    margin-bottom: 20px;
  }
`;

const useStyles = makeStyles({
  root: {
    padding: "16px",
    fontSize: 14,
    borderRadius: 0,
    boxShadow: "0 2px 3px 1px #cccccc",
    marginBottom: 20
  }
});

const AdminRating = () => {
  const classes = useStyles();
  let comments = [];
  return (
    <StyledPaper>
      <Card className={classes.root}>
        <h3>Average Overall Rating</h3>
        <p className="overallRatingNumber">{0.0}</p>
        <h3>Overall Comments</h3>
        {comments.map((comment, i) => (
          <Comment comment={comment} key={i} />
        ))}
      </Card>
    </StyledPaper>
  );
};

export default AdminRating;
