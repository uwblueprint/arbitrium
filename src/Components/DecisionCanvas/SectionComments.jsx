import React, { useState } from "react";
import styled from "styled-components";

import Comment from "../Comment/Comment";
import AddComment from "../AddComment/AddComment";

const SectionWrapper = styled.div`
  font-size: inherit;
  .header {
    margin-bottom: 20px;
    h3 {
      font-size: inherit;
      line-height: 20px;
      margin: 0;
    }
    .sub {
      color: #888888;
    }
  }
`;

function SectionComments({ comments, ...rest }) {
  return (
    <SectionWrapper>
      <div className="header">
        <h3>Notes</h3>
        <span className="sub">
          These notes will only be visible to yourself.
        </span>
      </div>
      {comments.map((comment, i) => (
        <Comment comment={comment} key={i} />
      ))}
      <AddComment
        placeholder={"Add a note..."}
        primaryLabel="Add a note"
        secondaryLabel="Cancel"
      />
    </SectionWrapper>
  );
}

export default SectionComments;
